import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import produce from 'immer';
import {session} from './helper';

import {isBefore} from 'date-fns';
import {ElsaDBTypes, ElsaTypes, Serialized, ProviderSession} from './@types';

type Platform = 'ctc' | 'addo' | 'labs';
type PlatformAction =
  | 'patient.add'
  | 'investigation.add'
  | 'prescription.add'
  | 'read'
  | 'write';
type PlatformRole = LabsRole | AddoRole | CtcRole;

type LabsRole = 'lab-tech';
type AddoRole = 'addo-guy';
type CtcRole = 'doctor';

export async function authenticateCredential(
  firestore: FirebaseFirestoreTypes.Module,
  identity: Identity,
) {
  const profileRef = firestore.collection('profiles').doc(identity.profileId);

  const _profile = await profileRef.get();

  if (!_profile.exists) {
    throw {
      code: 'elsa/user-profile-not-exist',
      message: "Profile doesn't exist",
    };
  }
  console.log('Profile exists... Pulling API key');

  // Getting information from profile
  const {API_KEY, platform} = _profile.data() as ElsaDBTypes.Profile;

  /** Fetch API information */
  const _api = await firestore.collection('API_KEYS').doc(API_KEY).get();
  if (!_api.exists) {
    throw {
      code: 'elsa/api-key-not-exist',
      message: 'The API_KEY registered with this device is missing',
    };
  }

  console.log('API Key pulled.. Pulling Credentials');
  // Information to validate what can be done by the user
  const {actions, platforms} = _api.data() as ElsaDBTypes.ApiKey;

  const cred = await profileRef
    .collection('credentials')
    .doc(identity.credentialId)
    .get();

  if (!cred.exists) {
    throw {
      code: 'elsa/credentials-not-exist',
      message: "Profile credentials doesn't exist",
    };
  }

  const credential = cred.data() as ElsaDBTypes.Credential;

  // Check if the platform is supported for the credential
  if (!platforms.includes(credential.platform)) {
    throw {
      code: 'elsa/unsupported-platform',
      message:
        "This API_KEY isn't paid to work with this platform. Please change subscription",
    };
  }

  return credential;
}

/**
 *
 * @param firestore
 * @param identity
 * @param device `{platform: Platform}` Specifications that correspond with the device
 * @returns
 */
export async function authenticateProvider(
  firestore: FirebaseFirestoreTypes.Module,
  user: FirebaseAuthTypes.User,
  identity: Identity,
  device: {platform: Platform},
): Promise<ElsaProvider> {
  const profileRef = firestore.collection('profiles').doc(identity.profileId);

  const _profile = await profileRef.get();

  if (!_profile.exists) {
    throw {
      code: 'elsa/user-profile-not-exist',
      message: "Profile doesn't exist",
    };
  }
  console.log('Profile exists... Pulling API key');

  // Getting information from profile
  const {API_KEY, platform} = _profile.data() as ElsaDBTypes.Profile;

  /** Fetch API information */
  const _api = await firestore.collection('API_KEYS').doc(API_KEY).get();
  if (!_api.exists) {
    throw {
      code: 'elsa/api-key-not-exist',
      message: 'The API_KEY registered with this device is missing',
    };
  }

  console.log('API Key pulled.. Pulling Credentials');
  // Information to validate what can be done by the user
  const {actions, platforms} = _api.data() as ElsaDBTypes.ApiKey;

  const cred = await profileRef
    .collection('credentials')
    .doc(identity.credentialId)
    .get();

  if (!cred.exists) {
    throw {
      code: 'elsa/credentials-not-exist',
      message: "Profile credentials doesn't exist",
    };
  }

  const credential = cred.data() as ElsaDBTypes.Credential;
  const {
    facilityId,
    platform: credPlatform,
    displayName,
    email,
    phoneNumber,
  } = credential;

  if (credPlatform !== device.platform) {
    // The device that's used with this device must be matching
    throw {
      code: 'elsa/incompatible-device',
      message: 'The device/app used is not compatible with the device',
    };
  }

  if (!platforms.includes(credPlatform)) {
    throw {
      code: 'elsa/unsupported-platform',
      message:
        "This API_KEY isn't paid to work with this platform. Please change subscription",
    };
  }

  console.log('Credentials Pulled.. Confirming Facility');

  const {exists: doesfacilityExist, data: facilityData} = await firestore
    .collection('facilities')
    .doc(facilityId)
    .get();

  if (!doesfacilityExist) {
    console.log('[FACILITY ID]: ', facilityId);
    throw {
      code: 'elsa/unknown-facility',
      message: 'Unknown Facility attached ' + facilityId,
    };
  }

  const facility = facilityData() as ElsaDBTypes.Facility;

  console.log('Facility confirmed.. Creating Session and Finishing up');

  // Creates the session for the user
  const uSession = session();

  // update session for the credentials
  // profileRef.collection('credentials').doc(identity.credentialId);
  // try {
  //   // update session record
  //   await profileRef.update({
  //     platform: produce(platform, df => {
  //       const session = {
  //         credentialId: cred.id,
  //         ...uSession,
  //       };
  //       if (df.ctc === undefined) {
  //         df.ctc = {};
  //       }

  //       df.ctc.session = session;
  //     }),
  //   });
  // } catch (err) {
  //   console.log("Couldn't update the session object for user");
  //   throw {code: 'elsa/dunno', message: 'Unable log user in'};
  // }

  console.log('Done!');

  return new ElsaProvider({
    actions: actions || ['read', 'write'],
    facility,
    identity,
    platform: credPlatform,
    session: uSession,
    user: {
      uid: user.uid,
      displayName: user.displayName ?? displayName,
      phoneNumber: user.phoneNumber ?? phoneNumber,
      email: user.email ?? email,
    },
  });
}

/**
 * Class definition for a user that's to operate in the system
 */
export class ElsaProvider {
  private _identity: Identity;
  private _session: ProviderSession;
  private _platform: {
    type: Platform;
    actions: PlatformAction[];
  };
  private _user: ElsaTypes.User;
  private _facility: ElsaTypes.Facility;

  /**
   * Builds the providers object
   * @param d
   */
  constructor(d: ElsaTypes.ProviderCredential) {
    this._identity = d.identity;
    this._session = d.session;
    this._platform = {
      type: d.platform,
      actions: d.actions,
    };
    this._user = d.user;
    this._facility = d.facility;
  }

  /**
   * @deprecated
   * << Not being used in implementation >>
   * Actions that can be performed by the user
   *
   */
  get actions() {
    return this._platform.actions;
  }

  /**
   * Platform type this user is expected to use
   */
  get platform() {
    return this._platform.type;
  }

  /**
   * Facility which the user mainly belongs to
   */
  get facility() {
    return this._facility;
  }

  /**
   * Represent the user. Best use for UI
   */
  get user() {
    return this._user;
  }

  get session() {
    return this._session;
  }

  /**
   * Checks if the provider credential has exprired
   * @returns
   */
  hasExpired() {
    return isBefore(new Date(), this.session.expiresAt);
  }

  /**
   * @deprecated
   * << Not being used in implementation >>
   * Check's if the user is able to perform a certain action
   * @param action Action to be done by user
   */
  ableTo(action: PlatformAction): boolean {
    return this.actions.includes(action);
  }

  /**
   * Serialize the `ElsaProvider` object
   */
  toJSON() {
    return Object.assign({}, {
      identity: this._identity,
      session: produce({} as Serialized.ProviderSession, df => {
        df.expiresAt = this._session.expiresAt.getTime();
        df.expiresIn = this._session.expiresIn;
      }),
      actions: this._platform.actions,
      platform: this._platform.type,
      facility: this._facility,
      user: this._user,
    } as Serialized.ElsaTypes.ProviderCredential);
  }

  /**
   * Deserialize the `ElsaProvider` from object
   * @param d
   * @returns
   */
  static fromJSON(d: Serialized.ElsaTypes.ProviderCredential) {
    const {
      session: {expiresAt, ...rest},
      ...other
    } = d;

    return new ElsaProvider(
      produce(other as ElsaTypes.ProviderCredential, df => {
        df['session'] = {
          ...rest,
          expiresAt: new Date(expiresAt),
        };
      }),
    );
  }
}
export type Identity = {profileId: string; credentialId: string};

export const Identity = {
  isParsable(str: string) {
    return str.match(/[a-zA-Z0-9_-]@[a-zA-Z0-9_-]/g) !== null;
  },
  /**
   *
   * @param identity
   * @returns
   */
  stringify: ({profileId, credentialId}: Identity): string => {
    if (credentialId === undefined) {
      return profileId;
    }

    return `${profileId}@${credentialId}`;
  },

  /**
   *
   * @param identityString
   * @returns
   */
  parse: (identityString: string): Identity => {
    const vals = identityString.split('@');
    // if (vals.length > 1) {
    // 	return { profileId: vals[0] };
    // }

    const [profileId, credentialId, ..._] = vals;
    return {profileId, credentialId};
  },
};

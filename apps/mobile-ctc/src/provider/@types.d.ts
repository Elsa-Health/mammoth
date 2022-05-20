import {Identity} from './backend';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export type ProviderSession = {
  expiresAt: Date;
  expiresIn: number;
};

export type Platform = 'ctc' | 'addo' | 'labs';
export type PlatformAction =
  | 'patient.add'
  | 'investigation.add'
  | 'prescription.add'
  | 'read'
  | 'write';
export type PlatformRole = LabsRole | AddoRole | CtcRole;

type LabsRole = 'lab-tech';
type AddoRole = 'addo-guy';
type CtcRole = 'doctor';

export declare namespace Serialized {
  type ProviderSession = {
    expiresAt: number;
    expiresIn: number;
  };

  namespace ElsaTypes {
    type User = {
      uid: string;
      displayName: string;
      email?: string;
      phoneNumber: string;
    };
    /**
     * When the object
     * is serialized
     */
    type ProviderCredential = {
      identity: Identity;
      session: Serialized.ProviderSession;
      platform: Platform;
      actions: PlatformAction[];
      user: ElsaTypes.User;
      facility: Facility;
    };

    type Facility = {
      // needed for ctc
      ctcCode?: string;
      name: string;
      phoneNumber: string;
      website?: string;
      address?: string;
    };
  }
}

export declare namespace ElsaTypes {
  type User = {
    uid: string;
    displayName?: string;
    email?: string;
    phoneNumber: string;
  };
  type ProviderCredential = {
    identity: Identity;
    session: ProviderSession;
    platform: Platform;
    actions: PlatformAction[];
    user: User;
    facility: Facility;
  };

  type Facility = {
    // needed for ctc
    ctcCode?: string;
    name: string;
    phoneNumber: string;
    website?: string;
    address?: string;
  };
}

export declare namespace ElsaDBTypes {
  type Facility = ElsaTypes.Facility;

  type Profile = {
    API_KEY: string;
    email: string;
    platform: {
      [x in Platform]?: {
        session?: {
          credentialId: string;
          expiresAt: FirebaseFirestoreTypes.Timestamp;
          expiresIn: number;
        };
      };
    };
    uid: string;
  };

  type Credential = {
    /**
     * Required as it's the means for logging in
     */
    phoneNumber: string;
    email?: string;
    displayName?: string;

    /**
     * Reference to the facility that's attached to the user
     */
    facilityId: string;

    /**
     * Platform this credential is designed to work
     */
    platform: Platform;

    /**
     * Role bound with the credentials
     */
    role?: PlatformRole;
  };

  type ApiKey = {
    /**
     * Id to reference the payment
     */
    payment: string;

    /**
     * Options that the API allows
     */
    platforms: Platform[];

    /**
     * Actions that are allowed
     */
    actions?: PlatformAction[];
  };
}

import analytics from '@react-native-firebase/analytics';
import {ElsaProvider} from '../provider/backend';

export const Analytics = {
  /**
   * Initialize analytics against the user
   * @param provider
   */
  async init(provider: ElsaProvider) {
    const {uid, ...other} = provider.user;

    //
    await analytics().setUserId(uid);
    await analytics().setUserProperties({
      user: uid,
      facilityCode: provider.facility.ctcCode || 'NONE',
      facilityName: provider.facility.name,
      platform: provider.platform,
      userFullName: other.displayName || 'NONE',
    });
  },

  async logEvent<T extends {[field: string]: any}>(name: string, data?: T) {
    await analytics().logEvent(name, data);
  },
};

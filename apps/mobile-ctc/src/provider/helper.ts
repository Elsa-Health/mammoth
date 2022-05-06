import {addWeeks, hoursToSeconds} from 'date-fns';
import {ProviderSession} from './@types';

export const session = (
  opt:
    | {type: 'default' | 'short'}
    | {type: 'custom'; expiresAt: Date; expiresIn?: number} = {type: 'default'},
): ProviderSession => {
  if (opt['type'] === 'custom') {
    return {
      expiresAt: opt.expiresAt,
      expiresIn: opt.expiresIn || 86400,
    };
  }

  if (opt['type'] === 'short') {
    return {
      expiresAt: addWeeks(new Date(), 1),
      expiresIn: hoursToSeconds(8),
    };
  }

  return {
    expiresAt: addWeeks(new Date(), 4),
    expiresIn: hoursToSeconds(24),
  };
};

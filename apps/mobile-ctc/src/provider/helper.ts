export const session = (
  opt:
    | {type: 'default' | 'short'}
    | {type: 'custom'; expiresAt: Date; expiresIn?: number},
): ProviderSession => {
  if (opt['type'] === 'custom') {
    return {
      expiresAt: opt.expiresAt,
      expiresIn: opt.expiresIn || 86400,
    };
  }

  if (opt['type'] === 'short') {
    return {
      expiresAt: new Date(2022, 5, 14),
      expiresIn: 2400,
    };
  }

  return {
    expiresAt: new Date(2022, 12, 12),
    expiresIn: 86400,
  };
};

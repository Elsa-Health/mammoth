import { Store } from '@sabertooth/storage';

/**
 * Building an offline-first working of storages
 * ------------------
 */

declare const SyncLTRStoreBuild: <LocalConfig, RemoteConfig>(local: Store.BuildConfig<LocalConfig>, remote: Store.BuildConfig<RemoteConfig>, convConfig: (conf?: LocalConfig | undefined) => RemoteConfig) => Store.BuildConfig<LocalConfig>;
declare const ASyncLTRStoreBuild: <LocalConfig, RemoteConfig>(local: Store.BuildConfig<LocalConfig>, remote: Store.BuildConfig<RemoteConfig>, convConfig: (conf?: LocalConfig | undefined) => RemoteConfig) => Store.BuildConfig<LocalConfig>;

export { ASyncLTRStoreBuild, SyncLTRStoreBuild };

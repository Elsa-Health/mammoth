/**
 * Building an offline-first working of storages
 * ------------------
 */

import { Store } from "@sabertooth/storage";
import _omit from "lodash.omit";
import _isEqual from "lodash.isequal";

const collectionDocumentLTR =
	<D extends Store.DocumentAction>(
		mdf: (n: string) => D,
		rdf: (n: string) => D,
		sync: boolean
	) =>
	(name: string) => {
		const md = mdf(name);
		const rd = rdf(name);

		return {
			create: async <T>(data: T) => {
				await md.create(data);

				if (sync) await rd.create(data);
				else rd.create(data);
			},
			set: async <T>(_data: T) => {
				// @ts-ignore
				const data = _omit(_data, ["$id"]);
				await md.set(data);

				if (sync) await rd.set(data);
				else rd.create(data);
			},
			query: async () => {
				const lq = await md.query();

				// pull from remote
				// this might fail
				const rq = await rd.query();

				console.log("QUERY:", rq);

				if (rq === null) {
					// push to remote
					// @ts-ignore
					rd.create(lq);
				} else {
					if (lq === null) {
						md.create(rq);
					} else {
						console.log({ lq, rq });
						if (!_isEqual(lq, rq)) {
							// local storage take priority
							// thus set content on the remote storage
							rd.set(lq);
						}
					}
				}

				return await md.query();
			},
		};
	};

const collectionLTR =
	<M, R, D extends Store.DocumentAction>(
		mc: Store.CollectionActions<M, D>,
		rc: Store.CollectionActions<R, D>,
		sync: boolean,
		convConfig: (conf?: M) => R
	) =>
	(documentActionLTR: (name: string) => D): Store.CollectionActions<M, D> => {
		// const mc = main.collection(name, documentAction);
		// const rc = rs.collection(name, documentAction);
		return {
			create: async (opt) => {
				await mc.create(opt);

				const run = async () => await rc.create(convConfig(opt));

				if (sync) await run();
				else run();
			},
			addDoc: async (docData) => {
				const d = await mc.addDoc(docData);

				const run = async () => await rc.addDoc({ $id: d, ...docData });

				if (sync) await run();
				else run();

				return d;
			},
			addMult: async (docsData) => {
				const ds = await mc.addMult(docsData);

				const run = async () =>
					await rc.addMult(
						docsData.map((d, ix) => ({ $id: ds[ix], ...d }))
					);

				if (sync) await run();
				else run();

				return ds;
			},

			/**
			 * [SYNC BASED]
			 * Starting with the local first approach
			 */
			// @ts-ignore
			queryDoc: async (qo: Store.QueryFilter | undefined) => {
				const ld = await mc.queryDoc(qo);

				// get remote data and merging
				const rd = await rc.queryDoc(qo);

				console.log("STOREPAIR.queryDoc");

				if (ld === null) {
					// push to cloud
					if (rd !== null) {
						mc.addDoc({ ...rd, $id: rd.$id });
					} else {
						return null;
					}
				} else {
					if (rd === null) {
						rc.addDoc({ ...ld, $id: ld.$id });
					} else {
						console.log({ ld, rd });
						if (!_isEqual(ld, rd)) {
							console.log("THEY DONT MATCH");
						} else {
							return ld;
						}
					}
				}

				if (!_isEqual(ld, rd)) {
					// sync changes up
					if (ld !== null) {
						const { $id, ...lld } = ld;
						if ($id !== undefined) {
							await rc.doc($id).set(lld);
						} else {
							console.error(ld);
							throw new Error("ID MISSING FROM");
						}
					} else {
						if (rd !== null) {
							const { $id, ...rrd } = rd;
							if ($id !== undefined) {
								await mc.doc($id).set(rrd);
							} else {
								console.error(ld);
								throw new Error("ID MISSING FROM");
							}
						}
					}
				}

				return await mc.queryDoc(qo);
			},
			queryDocs: mc.queryDocs,
			doc: documentActionLTR,
			docs: async () => {
				const lds = await mc.docs();

				const ldsIds = lds.map((l) => l.docId);
				const rdsIds = (await rc.docs()).map((s) => s.docId);

				// console.log({ ldsIds, rdsIds });
				// // contains all the ids
				// const commonSet = new Set<string>();

				// ldsIds.forEach((l) => commonSet.add(l));
				// rdsIds.forEach((l) => commonSet.add(l));

				// Those in REMOTE but not in LOCAL
				rdsIds.forEach((docId) => {
					// The beginning of CR
					if (!ldsIds.includes(docId)) {
						// if not in local store... save in local store
						lds.push({ docId, ...documentActionLTR(docId) });
					}
				});

				// const ss = ldsIds.filter((l) => !rdsIds.includes(l));

				// console.log({ ss });

				// Those in LOCAL but not in Remote
				// @ts-ignore
				const docsData = await mc.queryDocs({
					$id: ldsIds.filter((l) => !rdsIds.includes(l)),
				});

				// console.log({ docsData });

				if (docsData.length > 0) {
					// send to Remote
					await rc.addMult(docsData);
				}

				console.log({ lds, rdsIds });
				return lds;
			},
		};
	};

/**
 * Combining the storages. You might also want to store the actions to do
 * @param local
 * @param remote
 * @returns
 */
const LTRStoreConfig =
	(sync: boolean) =>
	<LocalConfig, RemoteConfig>(
		local: Store.BuildConfig<LocalConfig>,
		remote: Store.BuildConfig<RemoteConfig>,
		convConfig: (conf?: LocalConfig) => RemoteConfig
	): Store.BuildConfig<LocalConfig> => {
		return {
			collection: (name: string, documentAction) => {
				return collectionLTR(
					local.collection(name, local.collectionDocument(name)),
					remote.collection(name, remote.collectionDocument(name)),
					sync,
					convConfig
				)(documentAction);
			},
			// @ts-ignore
			collectionDocument: (collName: string) => (name: string) =>
				collectionDocumentLTR(
					local.collectionDocument(collName),
					remote.collectionDocument(collName),
					sync
				)(name),
			getCollections: local.getCollections,
		};
	};

export const SyncLTRStoreBuild = LTRStoreConfig(true);
export const ASyncLTRStoreBuild = LTRStoreConfig(false);

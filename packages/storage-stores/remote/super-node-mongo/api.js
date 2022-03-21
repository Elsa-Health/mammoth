import * as qs from "query-string";
export const collectionDocument = (snAxios) => (collName) => (docName, docRefFn) => {
    const collectionRef = collName;
    const docId = docName;
    return {
        create: async (data) => {
            await snAxios.post(`/col/${collectionRef}/doc/${docId}/create`, {
                data,
            });
            // return res.data.$id as string;
        },
        query: async () => {
            const res = await snAxios.post(`/col/${collectionRef}/doc/${docId}/query`);
            // console.log(`/col/${collectionRef}/doc/${docId}/query`);
            // Current return $id
            return res.data.data;
        },
        set: async (data) => {
            // const { $id, ...data } = _data;
            await snAxios.post(`/col/${collectionRef}/doc/${docId}/set`, {
                data,
            });
        },
    };
};
export const collection = (snAxios) => {
    return (name, documentAction) => {
        return {
            create: async (opts = {}) => {
                const { createOpts, ...rest } = opts;
                await snAxios.post(`/col/${name}/create?${qs.stringify(rest)}`, {
                    opt: createOpts,
                });
            },
            addDoc: async (docData) => {
                const res = await snAxios.post(`/col/${name}/add`, {
                    data: docData,
                });
                return res.data.$id;
            },
            addMult: async (docData) => {
                const res = await snAxios.post(`/col/${name}/add-multiple`, {
                    data: docData,
                });
                return res.data.$id;
            },
            queryDoc: async (queryOptions) => {
                const res = await snAxios.post(`/col/${name}/query?${qs.stringify(queryOptions || {})}`);
                return res.data.data;
            },
            queryDocs: async (queryOptions) => {
                const res = await snAxios.post(`/col/${name}/query-multiple?${qs.stringify(queryOptions || {})}`);
                return res.data.data;
            },
            doc: documentAction,
            docs: async () => {
                const res = await snAxios.post(`/col/${name}/docs`);
                return res.data.$ids.map((docName) => ({
                    docId: docName,
                    ...documentAction(docName),
                }));
            },
        };
    };
};

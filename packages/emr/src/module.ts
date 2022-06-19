// core implementation of the Modules
import invariant from "tiny-invariant";

export class Module<CollectionMap extends { [k: string]: any }> {
	private __collectionMap;
	constructor(collections: CollectionMap) {
		this.__collectionMap = collections;
	}

	collection<T extends keyof CollectionMap>(name: T): CollectionMap[T] {
		invariant(
			this.__collectionMap[name] !== undefined,
			`Missing collection ${String(name)}`
		);
		return this.__collectionMap[name];
	}
}

/**
 * Rest API to communicate with the collections
 */
import * as trpc from "@trpc/server";

import superjson from "superjson";
import { ServerDB } from "../store";
import { collection, query } from "papai/collection";

import * as z from "zod";

import { formatDistanceToNow } from "date-fns";
import * as trpcExpress from "@trpc/server/adapters/express";
import invariant from "tiny-invariant";
import { resolve } from "path";

export function createContext({
	req,
	res,
}: trpcExpress.CreateExpressContextOptions) {
	return {};
}

export function createCollectionContext(
	ctx: trpcExpress.CreateExpressContextOptions
) {
	const { req } = ctx;

	const collection = req.params.collectionName;
	invariant(collection, "Collection name must be specified");

	return { collection };
}

// collection context if needed
export type DbContext = ReturnType<typeof createContext>;
export type CollectionContext = ReturnType<typeof createCollectionContext>;

/**
 * Endpoint
 * URL: /db
 */
export const dbRouter = trpc
	.router<DbContext>()
	.query("", {
		resolve(req) {
			const { name, startTime } = ServerDB.server;
			// ...
			return {
				version: "v0",
				"edge-name": name,
				startedAt: startTime.toUTCString(),
				startAtInEnglish: formatDistanceToNow(startTime),
			};
		},
	})
	.query("collections", {
		async resolve() {
			const db = ServerDB.public();
			const set = await db.collections();

			return {
				message: "List of collections",
				data: Array.from(set).map((d) => d.collectionId),
			};
		},
	});

/**
 * Endpoint
 * URL: /db/collection/:collection
 */
export const collectionRouter = trpc.router<CollectionContext>().query("data", {
	async resolve(req) {
		// ...
		const db = ServerDB.public();
		const { startTime } = ServerDB.server;
		return {
			message: `Collected from ${formatDistanceToNow(startTime)}`,
			data: Array.from(await query(collection(db, req.ctx.collection))),
		};
	},
});

export type DBRouter = trpc.inferRouterContext<typeof dbRouter>;
export type CollectionRouter = trpc.inferRouterContext<typeof collectionRouter>;

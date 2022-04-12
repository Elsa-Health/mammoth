import React from "react";
import {
	CRDTMessageBox,
	DocumentAction,
	ObservableStore,
	resolveStates,
	SBState,
} from "../sabertooth";
import {
	PlusSmIcon as PlusSmIconSolid,
	RefreshIcon,
} from "@heroicons/react/solid";

import { v4 as uuidv4 } from "uuid";

import { w3cwebsocket as WebSocket } from "websocket";
import { buildCRDTStore as BuildCRDTStore } from "sabertooth-core";
import { configuration } from "sabertooth-stores/key-value-map";

// To store the messages
const crdtBox = new CRDTMessageBox();

const wsURL_DEV = "ws://localhost:5005/channel/crdt";
// const wsURL_DEV = "ws://7e75-197-250-199-90.ngrok.io/channel/crdt";
const wsURL_PROD =
	"wss://demo-sabertooth-crdt-channel.herokuapp.com/channel/crdt";
const wsURL = process.env.NODE_ENV === "development" ? wsURL_DEV : wsURL_PROD;

const generateId = (id?: string) => id || uuidv4();

const keyMapConfig = configuration({
	generateId,
	buildDocRef: (doc: string, col: string) => `${doc}-${col}`,
});

// const collectionsUID = "@@COLLECTIONS";
// const itemStoreConfig = buildItemStoreConfig({
// 	istore: localStorage,
// 	generateId,
// 	collectionsUID,
// 	buildCollRef: (collId) => `${collectionsUID}/${collId}`,
// 	buildDocRef: (docId, collId) => `${collectionsUID}/${collId}/${docId}`,
// });

const { store, sync, mergeOther } = BuildCRDTStore(
	ObservableStore,
	crdtBox,
	keyMapConfig
);

function TodoItem(props: {
	text: string;
	complete: boolean;
	onChange: (text: string) => void;
	onChecked: (checked: boolean) => void;
	onDelete: () => void;
}) {
	return (
		<li className="px-1.5 py-2 flex flex-row gap-2">
			<div>
				<input
					id="comments"
					aria-describedby="comments-description"
					name="comments"
					type="checkbox"
					checked={props.complete}
					onChange={(e) => props.onChecked(e.target.checked)}
					className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded-full"
				/>
			</div>
			<div>
				<p
					className={
						props.complete ? "line-through text-gray-600" : ""
					}
				>
					{props.text}
				</p>
			</div>
		</li>
	);
}
async function readTasks() {
	const pre = await Promise.all(
		(
			await store.collection("tasks").docs()
		).map(async ({ id, query }) => [id, await query()])
	);
	const vals = pre
		.filter((s) => s[1] !== null)
		.map(([id, v]) => ({
			id,
			...v,
		}))
		.sort((a, b) => a.pos - b.pos);

	// console.log({ pre });
	return vals;
}

const updateTaskText = async (id: string, text: string, cb?: () => void) => {
	await store.collection("tasks").document(id).update({ text });
	cb && cb();
};
const updateTaskValue = async (
	id: string,
	complete: boolean,
	cb?: () => void
) => {
	await store.collection("tasks").document(id).update({ complete });
	cb && cb();
};

const deleteTask = async (id: string, cb?: () => void) => {
	await store.collection("tasks").document(id).delete();
	cb && cb();
};

function QuickTodo({
	onNewCRDTMessage,
}: {
	onNewCRDTMessage: (
		messages_crdt: SBState<DocumentAction<any>, any>[]
	) => void;
}) {
	const [list, set] = React.useState<
		{ text: string; complete: boolean; id: string }[]
	>([]);

	const [resolved, setResolvedState] = React.useState<
		undefined | { docs: any; collections: any }
	>(undefined);

	const [logs, setLogs] = React.useState<any[]>([]);
	const [text, setText] = React.useState("");

	React.useEffect(() => {
		// store.document('tasks').set()
		store.collection("tasks").observe("updated", (delta) => {
			console.log("updated", delta);
			readTasks().then((tasks) => {
				set(tasks);
			});
		});
	}, []);

	const sendMessages = React.useCallback(
		() => onNewCRDTMessage(crdtBox.messages()),
		[onNewCRDTMessage]
	);

	const create = React.useCallback(
		async (text: string, cb?: () => void) => {
			await store
				.collection("tasks")
				.add([undefined, { text, complete: false, pos: list.length }]);

			cb && cb();
		},
		[list]
	);

	return (
		<div className="w-full grid md:grid-cols-2 grid-flow-row gap-4 px-8 py-4">
			<div className="w-full flex flex-col gap-3">
				<div className="w-full">
					<h2 className="font-extrabold text-3xl">Tasks</h2>
					<p className="py-2">
						This makes use of the{" "}
						<code className="border px-1 py-0.5 bg-gray-50 text-sm text-gray-700">
							sabertooth
						</code>{" "}
						package to store and retrieve tasks, along side the use
						of CRDTs to bring a <b>local-first</b> storage.
					</p>
					<div className="inline-flex flex-wrap gap-3">
						<button
							onClick={() => setLogs(crdtBox.messages())}
							className="inline-flex whitespace-nowrap items-center px-3 py-0.5 rounded-full text-sm font-medium border border-transparent bg-indigo-100 hover:bg-indigo-200 hover:border-indigo-400 text-indigo-800"
						>
							Update CDRT Snapshot
						</button>
						<button
							onClick={() => {
								const vs = resolveStates(crdtBox.set());
								setResolvedState(vs);
							}}
							className="inline-flex whitespace-nowrap items-center px-3 py-0.5 rounded-full text-sm font-medium border border-transparent bg-orange-100 hover:bg-orange-200 hover:border-orange-400 text-orange-800"
						>
							Flatten
						</button>
						<button
							className="inline-flex whitespace-nowrap gap-2 items-center px-3 py-0.5 rounded-full text-sm font-medium border border-transparent bg-green-100 hover:bg-green-200 hover:border-green-400 text-green-800"
							onClick={sync}
						>
							<RefreshIcon className="h-3 w-auto" />
							<span>Sync Remote Messages</span>
						</button>
					</div>
				</div>
				{/* Add item */}
				<div className="mt-1 flex rounded-md shadow-sm">
					<div className="relative flex items-stretch flex-grow focus-within:z-10">
						<input
							type="text"
							name="new-todo-task"
							id="text"
							value={text}
							onChange={(e) => setText(e.target.value)}
							className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
							placeholder="Type task"
						/>
					</div>
					<button
						type="button"
						onClick={() => {
							// set((s) => [...s, { text, complete: false }]);
							create(text, sendMessages).then(() => {
								setText("");
							});
						}}
						className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
					>
						<PlusSmIconSolid
							className="h-5 w-5 text-gray-400"
							aria-hidden="true"
						/>
						<span className="text-base">Add</span>
					</button>
				</div>

				{/* List of Items */}
				<div className="w-full">
					{list.length > 0 ? (
						<ul className="divide-y w-full">
							{list.map(({ text, complete, id }) => (
								<TodoItem
									text={text}
									complete={complete}
									key={id}
									onChange={(text) =>
										updateTaskText(id, text, sendMessages)
									}
									onChecked={(val) =>
										updateTaskValue(id, val, sendMessages)
									}
									onDelete={() =>
										deleteTask(id, sendMessages)
									}
								/>
							))}
						</ul>
					) : (
						<div className="border-dashed border-2 rounded-md px-3 py-3">
							<p>Nothing here!</p>
						</div>
					)}
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<div className="divide-y border rounded-sm">
					<h2 className="px-2.5 py-1.5 font-semibold">
						CDRT Snapshot
					</h2>
					<pre className="text-xs px-3 py-2.5 h-32 overflow-y-auto">
						{JSON.stringify(logs, undefined, 2)}
					</pre>
				</div>
				<div className="divide-y border rounded-sm">
					<h2 className="px-2.5 py-1.5 font-semibold">Flattened</h2>
					<pre className="text-xs px-3 py-2.5 h-32 overflow-y-auto">
						{JSON.stringify(resolved, undefined, 2)}
					</pre>
				</div>
			</div>
		</div>
	);
}

let socket = new WebSocket(wsURL);

export default function TodoApp() {
	React.useEffect(() => {
		socket.onopen = () => {
			console.log("Connected to CDRT WS server");
		};

		socket.onmessage = (data) => {
			if (socket.readyState === WebSocket.OPEN) {
				data.data.text().then((text) => {
					const vals = JSON.parse(text);
					// console.log(">", vals);
					mergeOther(vals ?? []);
					sync();
				});
			} else {
				if (socket.readyState !== WebSocket.CLOSED) {
					console.log("CLOSED... Reconnecting");
					socket;
				}
			}
		};
	}, []);

	return (
		<div className="min-h-screen mx-auto container h-full flex flex-col  items-center justify-center max-w-6xl">
			<QuickTodo
				onNewCRDTMessage={(messages_crdt) => {
					// console.log({ messages_crdt: crdtBox.messages() });
					socket.send(JSON.stringify(messages_crdt));
				}}
			/>
		</div>
	);
}

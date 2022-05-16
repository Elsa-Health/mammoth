import express from "express";

import { createServer } from "http";
import cors from "cors";

import channelCmrdt from "../channels/cmrdt";
import { store } from "./store";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../firebase";

const PORT = process.env.PORT || 5005;
const app = express();
const server = createServer(app);

app.use(express.json());

// TODO: CHANGE THIS BOY!!
app.use(cors({ origin: "*" }));

const CRDT_SOCKET_PATH = "/channel/cmrdt";

// Add ws for working with State-based CDRTs
channelCmrdt(server, CRDT_SOCKET_PATH);

type RecordVisit = {
	ctcId: string;
	createdAt: string;
	visitDate: string;
	ARVregimen: string;
	currentCTCID: string;
	duration: string;
};

// {
//     ctcId: "9wdwoix",
//     createdAt: DATE,
//     visitDate: cwinnd,
//     ARVregimen: "1-gbs-hew-23",
//     currentCTCID: "Id of the CTC where they picked up"
//     duration: "30 days" | "6 months"
// }

app.get("/", function (req, res) {
	res.json({ message: "Hey there!" });
});

app.post("/ctc/record-visit", async function (req, res) {
	console.log("This");
	const { body } = req;
	console.log(body);

	if (body === undefined) {
		res.status(401).json({
			message:
				"The body is empty, you need to pass on the record in this shape" +
				`
	{
		ctcId: string;
		date: string;
		facilityId: string;
		regimenDuration: string;
		regimen: string;
	}
	`,
		});
		return;
	}

	const { date, ...other } = body;

	await addDoc(collection(firestore, "ctc-pharmacy-tracking"), {
		...other,
		date: date ? new Date(date) : new Date(),
		createdAt: new Date(Date.now()),
	});
	res.status(201).json({ message: "Visit recorded!" });
	// await store.collection("medication-visits").add([undefined, req.body]);
});
// import { WebSocketServer } from "ws";
// const sampleWs = new WebSocketServer({
// 	path: "/sample/ws",
// 	server,
// });

// sampleWs.on("connection", (socket) => {
// 	socket.send(new Uint16Array(Buffer.from(JSON.stringify([1234, 343434]))), {
// 		binary: true,
// 	});
// 	socket.send(JSON.stringify([1234, 343434]));
// 	socket.send([1234, 343434]);
// 	socket.on("message", (data) => {
// 		// Something
// 		console.log("Received", data);
// 	});
// });

server.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
	console.log(`crdt ws listening at ${CRDT_SOCKET_PATH}`);
	// console.log(`Dev ws listening at ${"/sample/ws"}`);
});

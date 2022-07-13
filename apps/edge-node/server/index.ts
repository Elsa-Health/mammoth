import { WebSocket } from "ws";

const ws = new WebSocket("ws://ctc-server-edge.fly.dev/channel/cmrdt");
ws.onopen = (e) => {
	console.log("Connected!");
};

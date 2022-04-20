import React from "react";
import { useWebSocket } from "../app/utils/socket";

export default function TestPage() {
	const { socket } = useWebSocket({
		url: "ws://localhost:5005/channel/cmrdt",
		onMessage: (e) => {
			console.log(e.data);
			// (e.data as Blob).text().then((text) => {
			// 	console.log(">", text);
			// });
		},
	});
	return <div>Testing Socket. Open Console</div>;
}

import React from "react";
type NetworkStatus = "offline" | "connecting" | "online" | "error";

/**
 * WebSocket hook
 * @param param0
 * @returns
 */
export function useWebSocket({
	url,
	onMessage,
}: {
	url: string;
	onMessage?: (data: MessageEvent) => void;
}) {
	const [socket, setSocket] = React.useState<WebSocket | undefined>(
		() => undefined
	);

	const [status, setStatus] = React.useState<NetworkStatus | undefined>(
		"connecting"
	);

	React.useEffect(() => {
		if (socket === undefined) {
			const socket = new WebSocket(url);
			// socket.binaryType = "arraybuffer";
			setSocket(socket);
			setStatus("connecting");
		} else {
			socket.onopen = () => {
				setStatus("online");
			};

			socket.onmessage = (e) => {
				if (socket.readyState === WebSocket.OPEN) {
					onMessage?.(e);
				} else {
					if (socket.readyState !== WebSocket.CLOSED) {
						// console.log("CLOSED... Reconnecting");
						setStatus("connecting");
					}
				}
			};

			socket.onerror = () => {
				setStatus("error");
			};

			socket.onclose = () => {
				setStatus("offline");
				// console.log("Closed connection with CDRT WS.");
			};
		}
	}, [socket, onMessage, url]);

	/**
	 * Reconnecting to the websocket server
	 */
	const retry = React.useCallback(() => {
		const socket = new WebSocket(url);
		// socket.binaryType = "arraybuffer";
		setSocket(socket);
		setStatus("connecting");
	}, [url, setSocket, setStatus]);

	return { socket, retry, status };
}

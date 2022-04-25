import React from "react";
type NetworkStatus = "offline" | "connecting" | "online" | "error";

/**
 * WebSocket hook
 * @param param0
 * @returns
 */
export function useWebSocket({
	url,
	onOpen,
	onMessage,
}: {
	url: string;
	onOpen?: (e: Event) => void;
	onMessage?: (e: MessageEvent) => void;
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
			socket.onopen = (e) => {
				onOpen?.(e);
				setStatus("online");
			};

			socket.onmessage = (e) => {
				if (socket.readyState === WebSocket.OPEN) {
					onMessage?.(e);
				} else {
					if (socket.readyState !== WebSocket.CLOSED) {
						setStatus("connecting");
					}
				}
			};

			socket.onerror = () => {
				setStatus("error");
			};

			socket.onclose = () => {
				setStatus("offline");
			};
		}
	}, [socket, onMessage, url]);

	/**
	 * Reconnecting to the websocket server
	 */
	const retry = React.useCallback(() => {
		socket?.close();
		const socket_ = new WebSocket(url);
		// socket.binaryType = "arraybuffer";
		setSocket(socket_);
		setStatus("connecting");
	}, [url, setSocket, setStatus, socket]);

	return { socket, retry, status };
}

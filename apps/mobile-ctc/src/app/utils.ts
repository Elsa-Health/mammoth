import _ from 'lodash';
import {useWindowDimensions} from 'react-native';
import React from 'react';

// import {IMessageEvent, w3cwebsocket as WebSocket} from 'websocket';

/**
 * Calculates the patients age in years given years and months
 * @param years
 * @param months
 */
export const getAge = (years: number, months: number = 0): number => {
  return years + months / 12;
};

export const properAgeString = (age_: {
  years?: number;
  months?: number;
  days?: number;
}) => {
  const age = [
    age_.years ? `${age_.years} years` : undefined,
    age_.months ? `${age_.months} months` : undefined,
    age_.days ? `${age_.days} days` : undefined,
  ].filter(s => s !== undefined);

  if (age.length === 0) {
    return 'N/A age';
  }
  if (age.length === 1) {
    return age[0] as string;
  }

  const [firsts, last] = [age.slice(0, age.length - 1), age[age.length - 1]];
  return `${firsts.join(', ')} and ${last}`;
};

/**
 * Login information
 */

// Exported for tests
const fieldNames: FieldName[] = [
  'version',
  'id',
  'firstName',
  'lastName',
  'role',
  'telephone',
  'facilityName',
  'city',
  'facilityId',
];

export type AuthInfoMap = {[key in FieldName]: string};
export const ERROR_MESSAGE = 'Please scan a valid QR code';

export function authenticate(data: string): Promise<AuthInfoMap> {
  return new Promise((resolve, reject) => {
    try {
      const QRInfo = data.split('|');
      const info = _.zipObject(fieldNames, QRInfo) as AuthInfoMap;
      // console.log(data);
      if (
        Array.isArray(QRInfo) &&
        QRInfo.length === fieldNames.length &&
        info.facilityName &&
        info.version &&
        info.facilityId
      ) {
        // NEXT: get the GPS location of the user at the moment of sign in.
        resolve(info);
      }

      throw new Error(ERROR_MESSAGE);
    } catch (err) {
      // reject with the message
      reject(err);
    }
  });
}

/**
 * React native component
 */

/**
 * Min-width of the device that make elsa usable
 * Default: 350
 *
 * Should be more than 300
 */
const ELSA_DEVICE_USABLE_WIDTH = 350;
const isWidthConditionMet = (width: number) =>
  width / 3 > ELSA_DEVICE_USABLE_WIDTH;
export function useDeviceBreak() {
  const {width, height} = useWindowDimensions();

  /**
   * Break off at a point of a device when conditions are met
   */
  const [isTablet, setTablet] = React.useState<boolean>(() =>
    isWidthConditionMet(width),
  );

  React.useEffect(() => {
    setTablet(isWidthConditionMet(width));
  }, [width]);

  return {isTablet, isMobile: !isTablet};
}

export type NetworkStatus = 'offline' | 'connecting' | 'online' | 'error';

function initWebsocket(url: string) {
  const socket = new WebSocket(url);
  // socket.binaryType = 'blob'; // 'blob' | 'arraybuffer'
  return socket;
}
/**
 * RN WebSocket hook
 */
export function useWebSocket({
  url,
  onOpen,
  onMessage,
  onData,
}: {
  url: string;
  onOpen?: (socket: WebSocket) => void;
  onMessage?: (e: WebSocketMessageEvent) => void;
  onData?: <T>(data: T) => void;
}) {
  const [socket, setSocket] = React.useState<WebSocket | undefined>(
    () => undefined,
  );

  const [status, setStatus] = React.useState<NetworkStatus | undefined>(
    'connecting',
  );

  // const socketRef = React.useRef<WebSocket>(initWebsocket(url));

  React.useEffect(() => {
    if (socket === undefined) {
      setSocket(initWebsocket(url));
      setStatus('connecting');
    } else {
      // const socket = socketRef.current;
      socket.onopen = () => {
        setStatus('online');
        onOpen?.(socket);
      };

      socket.onmessage = e => {
        if (socket.readyState === WebSocket.OPEN) {
          onMessage?.(e);

          if (e.data !== undefined) {
            onData?.(JSON.parse(e.data));
          }
        } else {
          if (socket.readyState !== WebSocket.CLOSED) {
            setStatus('connecting');
          }
        }
      };

      socket.onerror = () => {
        setStatus('error');
      };

      socket.onclose = () => {
        setStatus('offline');
        socket.close();
        // console.log("Closed connection with CDRT WS.");
      };
    }
  }, [socket, onMessage, url]);

  /**
   * Reconnecting to the websocket server
   */
  const retry = React.useCallback(() => {
    socket?.close?.();
    setSocket(initWebsocket(url));
    // socketRef.current?.close();
    // socketRef.current = initWebsocket(url);
    setStatus('connecting');
  }, [url, socket, setStatus]);

  return {socket: socket, retry, status};
}

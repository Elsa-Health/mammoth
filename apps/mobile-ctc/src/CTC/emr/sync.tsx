/**
 * Syncronization of the application
 */
import React from 'react';
import {useWebSocket} from '../../app/utils';
import {fetchCRDTMessages, syncContentsFromSocket} from '../actions/socket';

import {ConnectionStatus} from '../misc';
import {onSnapshotUpdate} from './store';

export default function ConnectionSync({provider, onChangeStatus, wsURL}: any) {
  // Get web socket
  const {socket, status, retry} = useWebSocket({
    url: wsURL,
    onOpen(socket) {
      // Connected
      if (socket.readyState === WebSocket.OPEN) {
        fetchCRDTMessages(provider).then(message => {
          if (message !== null) {
            // console.log(s);
            const s = JSON.stringify(message);
            socket.send(s);
          }
        });
      }
    },

    onData(data) {
      // console.log(`[${provider.facility.ctcCode ?? 'UNKNOWN'}]:`, data);
      // peform synchronization
      syncContentsFromSocket(data);
    },

    // fires when status changed
    onChangeStatus,
  });

  React.useEffect(() => {
    if (socket !== undefined && status === 'online') {
      // console.log('Socket readyState');
      const sub = onSnapshotUpdate(provider, msg => {
        socket.send(JSON.stringify(msg));
      });

      return () => sub.unsubscribe();
    }
  }, [socket, status, provider]);

  return <ConnectionStatus retry={retry} />;
}

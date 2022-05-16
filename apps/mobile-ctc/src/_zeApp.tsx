import React from 'react';
import {ScrollView, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {useAsync} from 'react-use';
import {Text} from './@libs/elsa-ui/components';
import {deviceStorage} from './CTC/storage';

import uuid from 'react-native-uuid';

// get device storeage
const store = deviceStorage();

import {
  getStore,
  collection,
  setDoc,
  setDocs,
  doc,
  getDocs,
  updateDoc,
  addDoc,
  Document,
  onCollectionSnapshot,
  onDocumentSnapshot,
  Collection,
  getDoc,
} from 'papai/collection';
import KeyValueMapStore from 'papai/stores/collection/KeyValueMap';
import ItemStorage from 'papai/stores/collection/ItemStorage';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {Store} from 'papai/collection/core';

import {
  convert_v0_appointment_to_v1,
  convert_v0_investigation_to_v1,
  convert_v0_patient_to_v1,
  convert_v0_visit_to_v1,
} from './CTC/storage/migration-v0-v1';
import produce from 'immer';
import {Button, Modal, Portal} from 'react-native-paper';

const nr = 'CTC-APPLICATION-STOAGE';
const nStore = getStore(
  ItemStorage(
    {
      nameReference: nr,
      getCollRef: d => `${nr}/${d.collectionId}`,
      getDocRef: d => `${nr}/${d.collectionId}/${d.documentId}`,
      store: AsyncStorage,
    },
    () => uuid.v4() as string,
  ),
);

// This store the messages of the CRDTs
const crdtStore = getStore(KeyValueMapStore(() => uuid.v4() as string));

import {
  StateTrackingBox,
  onTrackStoreAddUpdateChanges,
} from 'papai/distributed/store';
import {HybridLogicalClock} from 'papai/distributed/clock';
import {useWebSocket} from './app/utils';

// init clock
const initClock = new HybridLogicalClock(
  uuid.v5(uuid.v4() as string, 'elsa.health') as string,
);

const statebox = new StateTrackingBox(initClock);

const refToKey = (d: Document.Ref) => `${d.collectionId}/${d.documentId}`;
// listen changes
onTrackStoreAddUpdateChanges(crdtStore, statebox, refToKey, (dr, state) => {
  console.log(dr, state);
});

// Collections

const randomCollection = collection<{name: string; age: number}>(
  crdtStore,
  'randomPile',
);

function docNode(store: Store, docRef: Document.Ref) {
  return doc(collection(store, docRef.collectionId), docRef.documentId);
}

function collectionNode(store: Store, collRef: Collection.Ref) {
  return collection(store, collRef.collectionId);
}

import {ThemeProvider} from './@libs/elsa-ui/theme';

export default function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  useAsync(async () => {}, []);

  const {socket, status, retry} = useWebSocket({
    url: 'http://f308-197-250-230-150.ngrok.io/crdt/state',
    onMessage: e => {
      console.log('onMessage');
      // assumed HUGE payload
      // -----------------
      const x: [Document.Ref, {[k: string]: Data}][] = e.data
        ? JSON.parse(e.data)
        : [];

      if (x.length === 0) {
        return;
      }

      // Might want to change this later
      // this assumes all are coming from one collection
      setDocs(
        randomCollection,
        x.map(c => {
          const [id, latest] = c;

          return [id.documentId, latest];
        }),
      );
    },
  });

  const sendStuffOver = () => {
    for (let s of statebox.latest()) {
      socket?.send(JSON.stringify(s));
      console.log('Sent', s[0], '!');
    }
    console.log('Send over!');
  };

  const randomAdd = async () => {
    const randomData = {
      name: uuid.v1() as string,
      age: 1 + Math.random() * 100,
    };

    await addDoc(randomCollection, randomData);
    console.log('Added random data!');
  };

  const randomEdit = async () => {
    // randomly select from random and update the values
    const ds = await getDocs(randomCollection);

    if (ds.length === 0) {
      console.log('Nothing to randomly edit in the random pile');
      return;
    }
    const ids = ds.map(s => s[0]);

    // randomly select
    const randomIdx = Math.min(
      ids.length - 1,
      Math.floor(Math.random() * ids.length),
    );
    const randomId = ids[randomIdx];

    const randomData = {};

    if (coinflip() === 'heads') {
      randomData['name'] = uuid.v4() as string;
    } else {
      randomData['age'] = 1 + Math.random() * 100;
    }

    await updateDoc(doc(randomCollection, randomId), randomData);
    console.log(`Randomly updated ${randomId} with data!`);
  };

  const [data, set] = React.useState<[string, {name: string; age: number}][]>(
    [],
  );

  React.useEffect(() => {
    getDocs(randomCollection)
      .then(d => {
        set(d);
      })
      .catch(d => {
        // err
        console.error(d);
        set([]);
      });
  }, []);

  React.useEffect(() => {
    crdtStore.collectionObservable.subscribe(x => {
      getDocs(randomCollection).then(outs => {
        set(outs);
      });
    });
  }, []);

  return (
    <ThemeProvider>
      <View style={{flex: 1}}>
        <Portal>
          <Modal visible={true}>
            <View
              style={{
                margin: 20,
                backgroundColor: '#fff',
                elevation: 3,
                padding: 16,
              }}>
              <Text>Migrating data to new store!</Text>
            </View>
          </Modal>
        </Portal>
      </View>
    </ThemeProvider>
  );

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Testing ground / {status}</Text>
        {(status === 'error' || status === 'offline') && (
          <Button onPress={retry}>Reconnect</Button>
        )}
        <View style={{flexDirection: 'row', paddingVertical: 5}}>
          <Button icon="plus" onPress={randomAdd}>
            Random Add
          </Button>
          <Button icon="shark" onPress={randomEdit}>
            Random Edit
          </Button>
        </View>
        <View style={{paddingVertical: 5}}>
          <Button onPress={sendStuffOver}>Send stuff over</Button>
          <Button
            onPress={() => {
              addDoc(randomCollection, {name: uuid.v4() as string, age: 13});
            }}>
            Test
          </Button>
        </View>
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text>Data: {data.length}</Text>
        <ScrollView>
          {data.map(([id, item]) => {
            return (
              <View key={id}>
                <Text>{item.name}</Text>
                <Text>{item.age}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const coinflip = () => {
  return (Math.random() * 1000) % 2 === 0 ? 'heads' : 'tails';
};

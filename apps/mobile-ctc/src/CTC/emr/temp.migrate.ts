import {Document, getDocs, setDocs} from 'papai/collection';
import {CollectionNode} from 'papai/collection/core';
import {EMRModule, getEMR} from './store';
import {EMR} from './store_';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {ElsaProvider} from '../../provider/backend';

async function migrateOver<T extends Document.Data>(
  old: CollectionNode<any>,
  new_: CollectionNode<T>,
) {
  const move = await getDocs(old);
  await setDocs(new_, move);
}

async function migrate(emr: EMRModule) {
  // new EMR collection references

  // old collection references
  const old = EMR.collections;

  await migrateOver(old.patients, emr.collection('patients'));
  //   await migrateOver(old.stock, emr.collection('stock'));
  await migrateOver(old.visits, emr.collection('visits'));
  await migrateOver(
    old.appointmentRequests,
    emr.collection('appointment-requests'),
  );
  await migrateOver(
    old.medicationRequests,
    emr.collection('medication-requests'),
  );
  await migrateOver(
    old.investigationRequests,
    emr.collection('investigation-requests'),
  );
}

export async function Migration(emr: EMRModule) {
  // migrate functions
  const syncronizeKey = 'STORAGE@MIGRATE-FROM-DEV-ONCE';

  // make sure the seeding happens
  return AsyncStorage.getItem(syncronizeKey)
    .then(isToMigrate => {
      if (isToMigrate !== null) {
        console.log('Not migrating...');
        return;
      }

      const ou = isToMigrate !== null ? JSON.parse(isToMigrate) : null;
      // console.log({isToSeed, ou});
      if (ou !== null) {
        console.log('Not migrating...');
        return;
      }

      console.log('Migrating...');
      // migrate the contents
      return migrate(emr).then(_ =>
        AsyncStorage.setItem(syncronizeKey, JSON.stringify(true)),
      );
    })
    .then(() => console.log('Done!'))
    .catch(err => console.error(err));
}

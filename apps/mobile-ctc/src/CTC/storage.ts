import {buildStore} from '../@libs/storage-core';
import ItemStorage from '../@libs/storage-stores/local/itemStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

export const keyGenerator = (key?: string | undefined) =>
  key || uuid.v4().toString();

const store = buildStore(
  ItemStorage('CTC_APP_STORAGE@DEV', AsyncStorage, keyGenerator),
);

export const deviceStorage = () => store;

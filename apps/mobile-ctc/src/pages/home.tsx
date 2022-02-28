import React from 'react';
import {View} from 'react-native';
import {
  VStack,
  Heading,
  Input,
  Icon,
  HStack,
  Button,
  Checkbox,
  Box,
} from 'native-base';
import {Layout, Text} from '../components';
import {SearchIcon} from '../assets/vectors';
import produce from 'immer';

import {create as createIpfsConnection} from 'ipfs-http-client';
const OrbitDB = require('orbit-db');

async function todosDB() {
  const ipfs = await createIpfsConnection({url: 'http://127.0.0.1:5001'});
  const orbitdb = await OrbitDB.createInstance(ipfs);

  const db = await orbitdb.keyvalue('test');

  await db.put('language', 'en');
  return db;
}

export default function App() {
  const [indices, setIndices] = React.useState<(string | number)[]>([]);
  const [items, setItems] = React.useState<
    Array<{text: string; isDone: boolean}>
  >([]);
  const [text, setText] = React.useState('');

  const createTask = () => {
    setItems(s =>
      produce(s, df => {
        df.push({text, isDone: false});
      }),
    );
    setText('');
  };

  const setDoneStatus = (ix: number, isDone: boolean) => {
    setItems(s =>
      produce(s, df => {
        df[ix].isDone = isDone;
      }),
    );
  };
  return (
    <Layout title="Todo">
      <VStack w="100%" space={5} alignSelf="center">
        <HStack w="100%">
          <Input
            placeholder="Type Task"
            borderRadius="4"
            value={text}
            onChangeText={text => setText(text)}
            py="2"
            px="4"
            w="3/4"
            fontSize="14"
          />
          <Button onPress={createTask} w="1/4" ml="1" colorScheme="primary">
            Add Task
          </Button>
        </HStack>
      </VStack>
      <View style={{flex: 1}}>
        <VStack h="90%" py="2">
          <ItemsRender items={items}>
            {({text, isDone}, ix) => (
              <Box style={{alignItems: 'flex-start', display: 'flex'}} py="1">
                <Checkbox
                  isChecked={isDone}
                  value={text}
                  onChange={isDone => setDoneStatus(ix, isDone)}
                  colorScheme="green">
                  <Text
                    style={
                      isDone
                        ? {
                            textDecorationLine: 'line-through',
                            textDecorationStyle: 'solid',
                            textDecorationColor: '#000',
                            color: '#ccc',
                            marginLeft: 10,
                          }
                        : {marginLeft: 10}
                    }>
                    {text}
                  </Text>
                </Checkbox>
              </Box>
            )}
          </ItemsRender>
        </VStack>
        <VStack py="1.5">
          <Text style={{fontSize: 13}}>
            {items.length - items.filter(s => s.isDone).length} items left
          </Text>
        </VStack>
      </View>
    </Layout>
  );
}
function ItemsRender<T>({
  items,
  children,
}: {
  items: T[];
  children: (props: T, index: number) => JSX.Element;
}) {
  return (
    <React.Fragment>
      {items.map((item, ix) => {
        return <React.Fragment key={ix}>{children(item, ix)}</React.Fragment>;
      })}
    </React.Fragment>
  );
}

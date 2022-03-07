import React from 'react';
import {View} from 'react-native';
import {Layout, Text} from '../../components';
import {Button, TextInput} from '../../components/input';

import deviceStorage from '../../app/storage';

const store = deviceStorage();
export default function SelectPatientScreen() {
  const [search, set] = React.useState('');
  const isSearching = search.length > 0;

  const [patients, setPatients] = React.useState([]);

  React.useEffect(() => {
    if (search.length > 0) {
      store
        .collection('visits')
        .search({$id: {$text: search}})
        .then(c => {
          console.log('Searched values:', c);
        });
      //   .catch(err => {
      //     console.warn('Unable to search for visit');
      //     console.log(err);
      //   });
    }
  }, [search]);

  React.useEffect(() => {
    if (isSearching) {
      store
        .collection('patients')
        .queryDocs()
        .then(docs => {
          console.log(docs);
        });
    }
  }, [isSearching]);

  return (
    <Layout>
      <View>
        <Button
          outline
          title="New Patient"
          onClick={() => console.log('Searching')}
        />
      </View>
      <View style={{paddingTop: 10}}>
        <Text>Select a patient to begin to attend</Text>
        <TextInput placeholder="enters" value={search} onChangeText={set} />
        {isSearching ? (
          <Button
            outline
            title="Search"
            onClick={() => console.log('Searching')}
          />
        ) : null}
      </View>

      {isSearching > 0 ? null : (
        <View style={{paddingVertical: 10}}>
          <Text>Expected patients</Text>
          <View></View>
        </View>
      )}
    </Layout>
  );
}

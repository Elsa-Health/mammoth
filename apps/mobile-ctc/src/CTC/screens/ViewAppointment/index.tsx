import React from 'react';
import {WorkflowScreen} from '../../../@workflows';
import {Layout, Text} from '../../../@libs//elsa-ui/components';

import {View} from 'react-native';

export default function ViewAppointentsScreen({
  entry: {title},
}: WorkflowScreen<{title: string}, {}>) {
  return (
    <Layout title={title || 'Appointments'}>
      <View>
        <Text>Something here</Text>
      </View>
    </Layout>
  );
}

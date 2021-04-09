import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import { Button, FAB, Surface } from 'react-native-paper';
import Text from 'components/Text';
import TextBox from 'components/TextBox';
import { Formik } from 'formik';
import { callAPI } from 'lib/api';

export default function Viewer() {
  const [process, setProcess] = useState(0);
  return (
    <View>
      <Text>Viewer</Text>
      <Button
        mode="contained"
        onPress={async () => {
          const list = await callAPI('users/list/tokens');
          const assets = await callAPI('users/list/assets');
          const account = await callAPI('users/list/accounts');

          console.log('********');
          console.log(list);
          console.log(assets);
          console.log(account);
          console.log('********');
        }}
      >
        TEST
      </Button>
    </View>
  );
}

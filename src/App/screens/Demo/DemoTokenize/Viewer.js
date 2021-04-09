import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import { Button, FAB, Surface } from 'react-native-paper';
import Text from 'components/Text';
import TextBox from 'components/TextBox';
import { Formik } from 'formik';
import { callAPI } from 'lib/api';
import Landscape from './Landscape';

const returnArtscapes = (assets) =>
  assets
    .filter((e) => e.type === 'ArtScape')
    .map((e) => (
      <View
        key={e.name + 'Button'}
        style={{
          flex: 1,
          height: 125,
          marginBottom: 10,
          marginTop: 10,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'gray',
        }}
      >
        <View
          style={{
            width: '50%',
            height: '100%',
            marginTop: -75,
            marginLeft: 10,
          }}
        >
          <Landscape seed={e.seed} />
        </View>
        <View
          style={{
            width: '50%',
            height: 50,
            marginLeft: '55%',
            flexDirection: 'column',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <Text
            style={{ marginLeft: 10, marginTop: -5, flex: 1 }}
          >{`Name: ${e.name}`}</Text>
          <Text style={{ flex: 1 }}>{`Ownership: ${e.ownership}`}</Text>
        </View>
      </View>
    ));

export default function Viewer() {
  const [process, setProcess] = useState(0);
  const [loadedAssets, setLoadedAssets] = useState([]);
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
          //console.log(list);
          console.log(assets);
          setLoadedAssets(assets);
          //console.log(account);
          console.log('********');
        }}
      >
        TEST
      </Button>
      {returnArtscapes(loadedAssets)}
    </View>
  );
}

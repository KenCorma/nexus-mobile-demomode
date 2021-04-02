import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import { Button, Surface } from 'react-native-paper';
import Text from 'components/Text';

const returnAssetDetails = (assets) =>
  assets.map((e, i) => (
    <View key={`asset${i}`} style={{ backgroundColor: 'gray' }}>
      <Text>Address: {e.address}</Text>
      <Text>Name: {e.json[0].value}</Text>
      <Text>Version: {e.json[1].value}</Text>
      <Text>Hash: {e.json[2].value}</Text>
      <Text>URL: {e.json[3].value}</Text>
    </View>
  ));

export default function Viewer() {
  const [process, setProcess] = useState(0);

  const assets = useSelector((state) => state.demo.assets?.assets);
  console.log(assets);
  return (
    <View>
      <Text>Viewer</Text>
      {returnAssetDetails(assets)}
    </View>
  );
}

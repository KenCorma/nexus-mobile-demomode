import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import { Button, Surface } from 'react-native-paper';
import Text from 'components/Text';

const returnAssetDetails = (assets) =>
  assets.map((e, i) => (
    <View key={`asset${i}`} style={{ backgroundColor: 'gray' }}>
      <Text>Address: {e.address}</Text>
      <Text>Name: {e.name}</Text>
      <Text>Version: {e.version}</Text>
      <Text>Hash: {e.hash}</Text>
      <Text>URL: {e.url}</Text>
    </View>
  ));

export default function Viewer() {
  const [process, setProcess] = useState(0);

  const assets = useSelector((state) => state.demo.assets?.assets);
  return (
    <View>
      <Text>Viewer</Text>
      {returnAssetDetails(assets)}
    </View>
  );
}

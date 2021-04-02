import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import { Button, Surface } from 'react-native-paper';
import Text from 'components/Text';

export default function Viewer() {
  const [process, setProcess] = useState(0);
  return (
    <View>
      <Text>Viewer</Text>
    </View>
  );
}

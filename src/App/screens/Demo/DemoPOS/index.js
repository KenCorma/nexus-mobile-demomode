import React, { useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, Surface } from 'react-native-paper';

import Divider from 'components/Divider';
import ScreenBody from 'components/ScreenBody';
import Text from 'components/Text';
import { useTheme } from 'lib/theme';

import Buyer from './Buyer';
import Seller from './Seller';

const styles = {
  infoSection: {
    elevation: 3,
    paddingHorizontal: 5,
    paddingVertical: 5,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  legal: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
};

export default function DemoPOSScreen() {
  const theme = useTheme();
  const [posMode, setPOSMode] = useState('');

  return (
    <ScreenBody>
      <Surface style={styles.infoSection}>
        <Divider />
        <Button
          mode="contained"
          labelStyle={{ fontSize: 12 }}
          style={{ width: '45%' }}
          onPress={() => {
            setPOSMode('Buyer');
          }}
        >
          Buyer Mode
        </Button>
        <Button
          mode="contained"
          labelStyle={{ fontSize: 12 }}
          style={{ width: '45%' }}
          onPress={() => {
            setPOSMode('Seller');
          }}
        >
          Seller Mode
        </Button>
        <Divider />
      </Surface>

      <View style={styles.legal}>
        {posMode != '' && (posMode === 'Buyer' ? <Buyer /> : <Seller />)}
      </View>
    </ScreenBody>
  );
}

DemoPOSScreen.nav = {
  name: 'DemoPOS',
  options: {
    title: 'Demo POS',
  },
};

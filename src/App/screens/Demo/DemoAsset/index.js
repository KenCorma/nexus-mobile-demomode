import React, { useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, Surface } from 'react-native-paper';

import Divider from 'components/Divider';
import InfoField from 'components/InfoField';
import ScreenBody from 'components/ScreenBody';
import Text from 'components/Text';
import { useTheme } from 'lib/theme';

import Viewer from './Viewer';
import Builder from './Builder';

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

export default function DemoAssetScreen() {
  const [assetMode, setAssetMode] = useState('');

  return (
    <ScreenBody>
      <Surface style={styles.infoSection}>
        <Divider />
        <Button
          mode="contained"
          labelStyle={{ fontSize: 12 }}
          style={{ width: '45%' }}
          onPress={() => {
            setAssetMode('Viewer');
          }}
        >
          View
        </Button>
        <Button
          mode="contained"
          labelStyle={{ fontSize: 12 }}
          style={{ width: '45%' }}
          onPress={() => {
            setAssetMode('Builder');
          }}
        >
          Build
        </Button>
        <Divider />
      </Surface>

      <View style={styles.legal}>
        {assetMode != '' &&
          (assetMode === 'Builder' ? <Builder /> : <Viewer />)}
      </View>
    </ScreenBody>
  );
}

DemoAssetScreen.nav = {
  name: 'DemoAssets',
  options: {
    title: 'Demo Assets',
  },
};

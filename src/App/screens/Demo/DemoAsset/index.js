import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Surface } from 'react-native-paper';

import Divider from 'components/Divider';
import InfoField from 'components/InfoField';
import ScreenBody from 'components/ScreenBody';
import Text from 'components/Text';
import { useTheme } from 'lib/theme';

const styles = {
  infoSection: {
    elevation: 3,
    paddingHorizontal: 30,
  },
  legal: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
};

export default function DemoAssetScreen() {
  const coreVer = useSelector((state) => state.core.info.version)
    .substring(0, 10)
    .replace(/[^0-9\.]+/g, '');

  return (
    <ScreenBody>
      <Surface style={styles.infoSection}>
        <Divider />
        <InfoField inline label="Embedded core version" value={coreVer} />
        <Divider />
      </Surface>

      <View style={styles.legal}>
        <Text>THIS IS LEFT BLANK</Text>
      </View>
    </ScreenBody>
  );
}

DemoAssetScreen.nav = {
  name: 'DemoAsset',
  options: {
    title: 'Demo Assets',
  },
};

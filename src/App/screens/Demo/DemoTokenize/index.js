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

export default function DemoTokenizeScreen() {
  return (
    <ScreenBody>
      <Surface style={styles.infoSection}>
        <Divider />
        <Divider />
      </Surface>

      <View style={styles.legal}>
        <Text>THIS IS LEFT BLANK</Text>
      </View>
    </ScreenBody>
  );
}

DemoTokenizeScreen.nav = {
  name: 'DemoTokenize',
  options: {
    title: 'Demo Tokenize',
  },
};

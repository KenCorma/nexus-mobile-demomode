import React from 'react';
import { View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, Surface } from 'react-native-paper';

import Divider from 'components/Divider';
import InfoField from 'components/InfoField';
import ScreenBody from 'components/ScreenBody';
import Text from 'components/Text';
import { useTheme } from 'lib/theme';
import { callAPI } from 'lib/api';

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

export default function DemoRoyaltiesScreen() {
  const coreVer = useSelector((state) => state.core.info.version)
    .substring(0, 10)
    .replace(/[^0-9\.]+/g, '');

  return (
    <ScreenBody>
      <Surface style={styles.infoSection}>
        <Divider />
        <Image
          style={{ height: 500, marginTop: 30, marginBottom: 30 }}
          source={{
            uri:
              'https://s.studiobinder.com/wp-content/uploads/2019/06/Movie-Poster-Template-Movie-Credits-StudioBinder.jpg',
          }}
        />
        <Divider />
      </Surface>

      <View style={styles.legal}>
        <Button
          mode="contained"
          onPress={async () => {
            const params = {
              pin: '1234',
              name: 'default',
              amount: 10,
              name_to: 'kendal:ComedyMovie',
            };

            const result = await callAPI('finance/debit/account', params);

            console.log(result);
          }}
        >
          Buy Movie
        </Button>
      </View>
    </ScreenBody>
  );
}

DemoRoyaltiesScreen.nav = {
  name: 'DemoRoyalties',
  options: {
    title: 'Demo Royalties',
  },
};

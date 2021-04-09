import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, Surface } from 'react-native-paper';

import Divider from 'components/Divider';
import InfoField from 'components/InfoField';
import ScreenBody from 'components/ScreenBody';
import Text from 'components/Text';
import { useTheme } from 'lib/theme';
import { callAPI } from 'lib/api';

import Landscape from './Landscape';

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

        <Button
          onPress={async () => {
            console.log(
              'Tokenize Demo'
            ); /*
            const params = {
              pin: '1234',
              address: '878b6SR2AA2N6eZCEGq7N5itKckviMvSPdpis4XMX54q2bxRD2G',
              token_name: 'phone:ABC',
            };

            const params2 = {
              pin: '1234',
              name: 'ABC',
              supply: 1000,
              decimals: 2,
            };
            const result = await callAPI('tokens/create/token', params2);
            console.log(result);
            const tokenresult = await callAPI('assets/tokenize/asset', params);
            console.log(tokenresult);
            const list = await callAPI('users/list/tokens');
            const assets = await callAPI('users/list/assets');
            console.log(list);
            console.log(assets);

            const makeaccparams = {
              pin: '1234',
              token_name: 'phone:ABC',
              name: 'testABC',
            };
            const makeaccount = await callAPI(
              'tokens/create/account',
              makeaccparams
            );
            console.log(makeaccount);

            const creditparams = {
              pin: '1234',
              name: 'ABC',
              amount: 500,
              name_to: 'testABC',
            };
            const credit = await callAPI('tokens/debit/token', creditparams);
            console.log(credit);
            */

            console.log(await callAPI('users/list/tokens'));
          }}
        >
          test
        </Button>
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

import React, { useState } from 'react';
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
import Generate from './Generate';
import Viewer from './Viewer';

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

export default function DemoTokenizeScreen() {
  const [tokenizeMode, setTokenizeMode] = useState('');
  return (
    <ScreenBody>
      <Surface style={styles.infoSection}>
        <Divider />
        <Button
          mode="contained"
          labelStyle={{ fontSize: 12 }}
          style={{ width: '45%' }}
          onPress={async () => {
            setTokenizeMode('Viewer');
          }}
        >
          View
        </Button>
        <Divider />
        <Button
          mode="contained"
          labelStyle={{ fontSize: 12 }}
          style={{ width: '45%' }}
          onPress={async () => {
            setTokenizeMode('Generate');
          }}
        >
          Generate
        </Button>
      </Surface>

      <View style={styles.legal}>
        {tokenizeMode != '' &&
          (tokenizeMode === 'Generate' ? <Generate /> : <Viewer />)}
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

/*
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

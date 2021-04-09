import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import { Button, FAB, Surface } from 'react-native-paper';
import Text from 'components/Text';
import TextBox from 'components/TextBox';
import { Formik, setNestedObjectValues } from 'formik';
import { callAPI } from 'lib/api';
import { fakeAddAsset } from 'lib/demo';
import Landscape from './Landscape';

function makeSeed(length) {
  var result = [];
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join('');
}

const seedLength = 20;
const defaultSeed = makeSeed(20);

export default function Generate() {
  const [process, setProcess] = useState(0);
  const username = useSelector((state) => state.user.status?.username);
  const [seed, setSeed] = useState(defaultSeed);
  return process === 0 ? (
    <>
      <Landscape seed={seed} />
      <Formik
        initialValues={{
          tokens: 1,
          ownership: 100,
          artName: 'Art',
          accountName: '',
        }}
        onSubmit={async ({ tokens, ownership, artName, accountName }, {}) => {
          console.log('Generating');
          const params = {};

          //Create Asset
          const createAssetParams = {
            pin: '1234',
            name: artName,
            type: 'ArtScape',
            seed: seed,
          };
          const createAssetResult = await callAPI(
            'assets/create/asset',
            createAssetParams
          );
          console.log(createAssetResult);

          //Create token
          const createTokenParams = {
            pin: '1234',
            name: `${artName}Tokens`,
            supply: tokens,
            decimals: 0,
          };
          const createTokenResult = await callAPI(
            'tokens/create/token',
            createTokenParams
          );
          console.log(createTokenResult);

          //Tokenize
          const tokenizeParams = {
            pin: '1234',
            name: `${username}:${artName}`,
            token_name: `${username}:${artName}Tokens`,
          };
          const tokenizeResult = await callAPI(
            'assets/tokenize/asset',
            tokenizeParams
          );
          console.log(tokenizeResult);

          // Make Account
          const makeAccountParams = {
            pin: '1234',
            token_name: `${username}:${artName}Tokens`,
            name: accountName,
          };

          const makeAccountResult = await callAPI(
            'tokens/create/account',
            makeAccountParams
          );
          console.log(makeAccountResult);

          //Set Ownership
          const ownershipParams = {
            pin: '1234',
            name: `${username}:${artName}Tokens`,
            amount: ((ownership / 100) * tokens).toFixed(0),
            name_to: accountName,
          };
          const ownershipResult = await callAPI(
            'tokens/debit/token',
            ownershipParams
          );
          console.log(ownershipResult);

          setProcess(1);
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <View style={{ width: 300 }}>
            <Button
              mode="contained"
              style={{ marginTop: -50, marginBottom: 10 }}
              onPress={() => setSeed(makeSeed(seedLength))}
            >
              Re-Generate
            </Button>
            <TextBox.Formik
              name={`tokens`}
              mode="outlined"
              background={['surface', 2]}
              keyboardType="numeric"
              label={`Tokens`}
            />
            <TextBox.Formik
              name={`ownership`}
              mode="outlined"
              background={['surface', 2]}
              keyboardType="numeric"
              label={`Ownership`}
            />
            <TextBox.Formik
              name={`artName`}
              mode="outlined"
              background={['surface', 2]}
              label={`Token Name`}
            />
            <TextBox.Formik
              name={`accountName`}
              mode="outlined"
              background={['surface', 2]}
              label={`Account Name`}
            />
            <FAB
              style={{ marginTop: 10 }}
              animated={false}
              mode="contained"
              onPress={handleSubmit}
              loading={isSubmitting}
              disabled={isSubmitting}
              label={isSubmitting ? 'Validating...' : 'Proceed'}
            />
          </View>
        )}
      </Formik>
    </>
  ) : (
    <>
      <Text>Congradulations your Asset has been Tokenized!</Text>

      <Text>Go to the View page to view your Art Assets</Text>
    </>
  );
}

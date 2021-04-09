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
  const [seed, setSeed] = useState(defaultSeed);
  return (
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
          const createTokenParams = {
            pin: '1234',
            name: artName,
            supply: tokens,
            decimals: 2,
          };
          const createTokenResult = await callAPI(
            'tokens/create/token',
            createTokenParams
          );
          console.log(createTokenResult);
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
  );
}

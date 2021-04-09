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
          name: '',
          version: '',
          hash: '',
          url: '',
        }}
        onSubmit={async ({ name, version, hash, url }, {}) => {}}
      >
        {({ handleSubmit, isSubmitting, ...rest }) => (
          <View style={{ width: 300 }}>
            <Button
              mode="contained"
              onPress={() => setSeed(makeSeed(seedLength))}
            >
              Re-Generate
            </Button>
            <TextBox.Formik
              name={`name`}
              mode="outlined"
              background={['surface', 2]}
              label={`Name`}
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

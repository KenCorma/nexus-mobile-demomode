import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import { Button, FAB, Surface } from 'react-native-paper';
import Text from 'components/Text';
import TextBox from 'components/TextBox';
import { Formik } from 'formik';
import { callAPI } from 'lib/api';
import { fakeAddAsset } from 'lib/demo';

export default function Builder() {
  const [process, setProcess] = useState(0);
  return (
    <View>
      <Text>Builder</Text>
      <View>
        {
          {
            0: (
              <>
                <Formik
                  initialValues={{
                    name: '',
                    version: '',
                    hash: '',
                    url: '',
                  }}
                  onSubmit={async ({ name, version, hash, url }, {}) => {
                    const params = {
                      format: 'JSON',
                      json: [
                        {
                          name: 'name',
                          type: 'string',
                          value: name,
                          mutable: false,
                        },
                        {
                          name: 'version',
                          type: 'string',
                          value: version,
                          mutable: true,
                        },
                        {
                          name: 'hash',
                          type: 'string',
                          value: hash,
                          mutable: true,
                        },
                        {
                          name: 'url',
                          type: 'string',
                          value: url,
                          mutable: true,
                        },
                      ],
                    };
                    fakeAddAsset();
                    setProcess(1);
                    /*
                    const result = await callAPI('assets/create/asset', params);
                    if (result.address) {
                      setProcess(1);
                    }
                    */
                  }}
                >
                  {({ handleSubmit, isSubmitting, ...rest }) => (
                    <View style={{ width: 300 }}>
                      <TextBox.Formik
                        name={`name`}
                        mode="outlined"
                        background={['surface', 2]}
                        label={`Name`}
                      />
                      <TextBox.Formik
                        name={`version`}
                        mode="outlined"
                        background={['surface', 2]}
                        label={`Version`}
                      />
                      <TextBox.Formik
                        name={`hash`}
                        mode="outlined"
                        background={['surface', 2]}
                        label={`Hash`}
                      />
                      <TextBox.Formik
                        name={`url`}
                        mode="outlined"
                        background={['surface', 2]}
                        label={`URL`}
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
            ),
            1: (
              <>
                <View>
                  <Text>
                    Congradulations your asset has been created, go to the View
                    tab to view it.
                  </Text>
                </View>
              </>
            ),
          }[process]
        }
      </View>
    </View>
  );
}

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import { Button, Surface, FAB } from 'react-native-paper';

import QRCode from 'react-native-qrcode-svg';

import Text from 'components/Text';
import SvgIcon from 'components/SvgIcon';
import { useTheme, disabledColor } from 'lib/theme';
import TextBox from 'components/TextBox';
import { Formik, useFormikContext } from 'formik';

import * as yup from 'yup';

const returnItemList = ({ values }) =>
  new Array(values.numberOfItems).fill('blank').map((e, i) => formItem(i));

const formItem = (element) => (
  <View
    key={`formItem${element}`}
    style={{
      flex: 1,
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <TextBox.Formik
      name={`${element}.name`}
      mode="outlined"
      background={['surface', 2]}
      label={`Name`}
      style={{ width: '25%' }}
    />

    <TextBox.Formik
      name={`${element}.units`}
      mode="outlined"
      background={['surface', 2]}
      label={`Units`}
      keyboardType="numeric"
      style={{ width: '25%' }}
    />

    <TextBox.Formik
      name={`${element}.unitCost`}
      mode="outlined"
      background={['surface', 2]}
      label={`PricePer`}
      keyboardType="numeric"
      style={{ width: '25%' }}
    />
  </View>
);

const returnPlusButton = (props) => {
  const { setFieldValue, values } = props;
  return (
    <FAB
      animated={false}
      mode="contained"
      onPress={() => {
        console.log(setFieldValue);
        setFieldValue('numberOfItems', values.numberOfItems + 1);
      }}
      label="+"
    />
  );
};

export default function Seller() {
  const [process, setProcess] = useState(0);

  const theme = useTheme();
  const defaultAddress = useSelector((state) =>
    state.user.accounts.filter((e) => e.name === 'default')
  );

  return (
    <View>
      <Text
        style={{
          backgroundColor: theme.dark ? theme.onDanger : theme.primary,
          display: 'flex',
          color: 'white',
        }}
      >
        Seller
      </Text>
      {
        {
          0: (
            <>
              <Button
                mode="contained"
                labelStyle={{ fontSize: 12 }}
                onPress={() => {
                  setProcess(1);
                }}
              >
                Show QR
              </Button>
            </>
          ),
          1: (
            <>
              <View style={{ backgroundColor: theme.background }}>
                <Text sub>Set Up invoice</Text>
                <Formik
                  initialValues={{
                    numberOfItems: 1,
                    amount: '',
                    nameOrAddress: '',
                    reference: '',
                  }}
                  validationSchema={yup.object().shape({
                    nameOrAddress: yup.string().required('Required!'),
                    amount: yup
                      .number()
                      .typeError('Invalid!')
                      .min(0, 'Invalid!'),
                    reference: yup
                      .number()
                      .typeError('Invalid!')
                      .integer('Invalid!')
                      .min(0, 'Invalid!'),
                  })}
                  onSubmit={async (
                    { nameOrAddress, amount, reference },
                    { setFieldError }
                  ) => {
                    const resolved = await callAPI('system/validate/address', {
                      address: nameOrAddress,
                    });
                    if (resolved) {
                      //send
                    } else {
                      setFieldError('nameOrAddress', 'Invalid name/address!');
                    }
                  }}
                >
                  {({ handleSubmit, isSubmitting, ...rest }) => (
                    <>
                      {returnItemList(rest)}
                      {returnPlusButton(rest)}
                      <FAB
                        style={{ marginTop: 10 }}
                        animated={false}
                        mode="contained"
                        onPress={handleSubmit}
                        loading={isSubmitting}
                        disabled={isSubmitting}
                        label={isSubmitting ? 'Validating...' : 'Proceed'}
                      />
                    </>
                  )}
                </Formik>
              </View>
            </>
          ),
        }[process]
      }
    </View>
  );
}

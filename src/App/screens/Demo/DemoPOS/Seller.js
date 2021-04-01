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
import QRScanner from 'components/AddressPicker/QRScanner';
import { callAPI } from 'lib/api';

const blankInvoiceEntry = { name: 'Item', units: '1', unitCost: '1' };

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
      name={`invoiceItems[${element}].name`}
      mode="outlined"
      background={['surface', 2]}
      label={`Name`}
      style={{ width: '25%' }}
    />

    <TextBox.Formik
      name={`invoiceItems[${element}].units`}
      mode="outlined"
      background={['surface', 2]}
      label={`Units`}
      keyboardType="numeric"
      style={{ width: '25%' }}
    />

    <TextBox.Formik
      name={`invoiceItems[${element}].unitCost`}
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
        values.invoiceItems.push(blankInvoiceEntry);
        setFieldValue('invoiceItems', values.invoiceItems);
        setFieldValue('numberOfItems', values.numberOfItems + 1);
      }}
      label="+"
    />
  );
};

const returnMinusButton = (props) => {
  const { setFieldValue, values } = props;
  return (
    <FAB
      animated={false}
      style={{ marginTop: 5 }}
      mode="contained"
      onPress={() => {
        values.invoiceItems.pop();
        setFieldValue('invoiceItems', values.invoiceItems);
        setFieldValue('numberOfItems', values.numberOfItems - 1);
      }}
      label="-"
    />
  );
};

const returnTotal = ({ values }) => {
  const { invoiceItems } = values;
  console.log(invoiceItems);
  return (
    <Text>
      {invoiceItems
        .map((e) => Number(e.units) * Number(e.unitCost))
        .reduce((sum, i) => sum + i)}
    </Text>
  );
};

export default function Seller() {
  const [process, setProcess] = useState(0);
  const [customerAddress, setCustomerAddress] = useState('');

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
                    invoiceItems: [blankInvoiceEntry],
                  }}
                  onSubmit={async ({ invoiceItems }, {}) => {
                    const total = invoiceItems
                      .map((e) => Number(e.units) * Number(e.unitCost))
                      .reduce((sum, i) => sum + i);
                    console.log(total);
                    if (!isNaN(total)) {
                      setProcess(2);
                    }
                  }}
                >
                  {({ handleSubmit, isSubmitting, ...rest }) => (
                    <>
                      {returnItemList(rest)}
                      {returnPlusButton(rest)}
                      {returnMinusButton(rest)}
                      {returnTotal(rest)}
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
          2: (
            <View>
              <Text>Get ready to scan customer's QR code</Text>
              <Button mode="contained" onPress={() => setProcess(3)}></Button>
            </View>
          ),
          3: (
            <QRScanner
              setAddress={(address) => {
                setCustomerAddress(address);
                setProcess(4);
              }}
            />
          ),
          4: (
            <View>
              <Text>Invoice is ready to be sent</Text>
              <Formik
                initialValues={{
                  invoice: {},
                }}
                onSubmit={async ({ invoice }, {}) => {
                  const sendInvoiceResult = await callAPI('');
                  let waitForConfirmation = true;
                  while (waitForConfirmation) {
                    waitForConfirmation = new Promise((resolve) =>
                      setTimeout(resolve, 1000)
                    );
                  }
                  setProcess(5);
                }}
              >
                {({ handleSubmit, isSubmitting, ...rest }) => (
                  <>
                    {returnItemList(rest)}
                    {returnPlusButton(rest)}
                    {returnMinusButton(rest)}
                    {returnTotal(rest)}
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
          ),
          5: (
            <View>
              <Text>Invoice is now paid and confirmed</Text>
              <Button mode="contained" onPress={() => {}}>
                Finish Demo
              </Button>
            </View>
          ),
        }[process]
      }
    </View>
  );
}

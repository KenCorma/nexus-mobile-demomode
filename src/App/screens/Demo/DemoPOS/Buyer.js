import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import { Button, Surface } from 'react-native-paper';

import QRCode from 'react-native-qrcode-svg';

import Text from 'components/Text';
import SvgIcon from 'components/SvgIcon';
import { useTheme, disabledColor } from 'lib/theme';
import { fakeAddInvoice, loadInvoices } from 'lib/demo';
import { getStore } from 'store';

function watchInvoices(setProcess) {
  const unsub = getStore().observe(
    (state) => state,
    async (state, oldState) => {
      if (!oldState || !state) return;
      const txCount = state?.demo?.pos?.invoices;
      const oldTxCount = oldState?.demo?.pos?.invoices;
      if (txCount > oldTxCount) {
        setProcess(2);
        unsub();
      }
    }
  );
}

export default function Buyer() {
  const [process, setProcess] = useState(0);

  const theme = useTheme();
  const invoices = useSelector((state) => state.demo.pos?.invoices);
  const latestInvoice =
    invoices && invoices.length > 0 ? invoices[invoices.length - 1] : '';
  const defaultAddress = useSelector((state) =>
    state.user.accounts.filter((e) => e.name === 'default')
  );

  switch (process) {
    case 2:
      console.log(invoices);

      break;

    default:
      break;
  }

  return (
    <View>
      <Text
        style={{
          backgroundColor: theme.dark ? theme.onDanger : theme.primary,
          display: 'flex',
          color: 'white',
        }}
      >
        Buyer
      </Text>
      {
        {
          0: (
            <>
              <Button
                mode="contained"
                labelStyle={{ fontSize: 12 }}
                onPress={async () => {
                  const ssss = await loadInvoices();
                  console.log(ssss);
                  watchInvoices(setProcess);
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
                <Text sub>Scan Payment Address</Text>
                <QRCode
                  value={defaultAddress.address}
                  size={200}
                  color={theme.foreground}
                  backgroundColor={
                    theme.dark ? overlay(5, theme.surface) : theme.surface
                  }
                />
                <Text sub>Waiting for response...</Text>

                <Button mode="text" onPress={() => fakeAddInvoice()}>
                  Add Fake One
                </Button>
              </View>
            </>
          ),
          2: (
            <>
              <View>
                <Text>
                  An Invoice from {latestInvoice.sender} is requesting payment
                </Text>
                <Text>Totale {latestInvoice.total}NXS</Text>
                <Text>This Invoice is for the following items:</Text>
                {latestInvoice?.items?.map((e) => (
                  <Text
                    key={e.units.toString() + e.object + e.unitcost.toString()}
                  >
                    {e.units} * {e.object} = {e.units * e.unitcost}
                  </Text>
                ))}

                <Button
                  mode="contained"
                  onPress={() => {
                    setProcess(3);
                  }}
                >
                  Pay Now
                </Button>
              </View>
            </>
          ),
          3: (
            <>
              <View>
                <Text>Purchase Complete</Text>
              </View>
            </>
          ),
        }[process]
      }
    </View>
  );
}

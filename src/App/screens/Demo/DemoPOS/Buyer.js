import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import { Button, Surface } from 'react-native-paper';

import QRCode from 'react-native-qrcode-svg';

import Text from 'components/Text';
import SvgIcon from 'components/SvgIcon';
import { useTheme, disabledColor } from 'lib/theme';
import { loadInvoices } from 'lib/demo';

export default function Buyer() {
  const [process, setProcess] = useState(0);

  const theme = useTheme();
  const invoices = useSelector((state) => state.demo.pos?.invoices);
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
        Buyer
      </Text>
      {
        {
          0: (
            <>
              <Button
                mode="contained"
                labelStyle={{ fontSize: 12 }}
                onPress={() => {
                  loadInvoices();
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
              </View>
            </>
          ),
        }[process]
      }
    </View>
  );
}

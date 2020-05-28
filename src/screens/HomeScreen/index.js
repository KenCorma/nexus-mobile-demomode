import React from 'react';
import { Surface } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { shadow } from 'react-native-paper';
import styled from '@emotion/native';

import Text from 'components/Text';
import Divider from 'components/Divider';
import BalanceSection from './BalanceSection';
import Account from './Account';

const Container = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.dark ? theme.background : theme.primary,
}));

const AccountsPane = styled(Surface)(({ theme }) => ({
  flex: 1,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  paddingHorizontal: 20,
  // backgroundColor: theme.surface,
  elevation: theme.dark ? 1 : 6,
  ...shadow(theme.dark ? 1 : 6),
}));

const SubHeader = styled(Text.template({ modifier: 'sub' }))({
  paddingVertical: 15,
  textTransform: 'uppercase',
  fontSize: 12,
  textAlign: 'center',
});

const Accounts = styled(ScrollView)({
  flex: 1,
});

export default function HomeScreen() {
  return (
    <Container>
      <BalanceSection />

      <AccountsPane>
        <SubHeader>Accounts</SubHeader>
        <Divider />
        <Accounts>
          <Account account={{ name: 'default', balance: '2,232' }} />
          <Account account={{ name: 'trust', balance: '34,742.34' }} />
          <Account account={{ name: 'saving', balance: '0' }} />
        </Accounts>
      </AccountsPane>
    </Container>
  );
}

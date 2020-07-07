import React from 'react';
import styled from '@emotion/native';
import { FlatList } from 'react-native';
import { IconButton, FAB } from 'react-native-paper';
import { useSelector } from 'react-redux';

import Divider from 'components/Divider';
import ScreenBody from 'components/ScreenBody';
import TextBox from 'components/TextBox';
import { navigate } from 'lib/navigation';
import { setContactSearch } from 'lib/ui';
import memoize from 'utils/memoize';
import ContactsIcon from 'icons/address-book.svg';
import Contact from './Contact';

const Wrapper = styled(ScreenBody)({
  paddingBottom: 106,
});

const AddButton = styled(FAB)({
  position: 'absolute',
  right: 30,
  bottom: 30,
});

const selectContacts = memoize((state) =>
  state.contacts
    ? Object.entries(state.contacts)
        .map(([name, address]) => ({ name, address }))
        .sort((a, b) => a.name.localeCompare(b.name))
    : []
);

const filterContacts = memoize((contacts, keyword) => {
  const kw = keyword.toLowerCase();
  return contacts.filter((contact) => contact.name.toLowerCase().includes(kw));
});

export default function ContactsScreen() {
  const contacts = useSelector(selectContacts);
  const search = useSelector((state) => state.ui.contactSearch);
  const filteredContacts =
    search && typeof search === 'string'
      ? filterContacts(contacts, search)
      : contacts;

  return (
    <Wrapper scroll={false} style={{ paddingVertical: 10 }}>
      <FlatList
        data={filteredContacts}
        ItemSeparatorComponent={Divider}
        keyExtractor={(contact) => contact.name}
        renderItem={({ item }) => <Contact contact={item} />}
      />
      <AddButton
        icon="plus"
        onPress={() => {
          navigate('NewContact');
        }}
      />
    </Wrapper>
  );
}

ContactsScreen.nav = ({ contactSearch }) => ({
  name: 'Contacts',
  icon: ContactsIcon,
  options: {
    tabBarLabel: 'Contacts',
  },
  stackOptions: {
    title: 'Contacts',
    headerTitle:
      typeof contactSearch === 'string'
        ? () => (
            <TextBox
              background="primary"
              value={contactSearch}
              onChangeText={setContactSearch}
              autoFocus
              autoCapitalize="words"
              dense
              placeholder="Search contact"
              style={{ top: 0 }}
            />
          )
        : 'Contacts',
    headerTitleAlign: 'left',
    headerRight:
      typeof contactSearch === 'string'
        ? ({ tintColor }) => (
            <IconButton
              icon="close"
              color={tintColor}
              size={25}
              onPress={() => {
                setContactSearch(null);
              }}
            />
          )
        : ({ tintColor }) => (
            <IconButton
              icon="magnify"
              color={tintColor}
              size={25}
              onPress={() => {
                setContactSearch('');
              }}
            />
          ),
  },
  listeners: {
    blur: () => {
      if (typeof contactSearch === 'string') {
        setContactSearch(null);
      }
    },
  },
});

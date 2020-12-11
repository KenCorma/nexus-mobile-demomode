import React from 'react';
import { View, FlatList } from 'react-native';
import { IconButton, FAB } from 'react-native-paper';
import { useSelector } from 'react-redux';

import Divider from 'components/Divider';
import ScreenBody from 'components/ScreenBody';
import Text from 'components/Text';
import TextBox from 'components/TextBox';
import { navigate } from 'lib/navigation';
import { setContactSearch } from 'lib/ui';
import memoize from 'utils/memoize';
import Contact from './Contact';

const styles = {
  wrapper: {
    paddingBottom: 106,
  },
  addBtn: {
    position: 'absolute',
    right: 30,
    bottom: 30,
  },
  emptyMessage: {
    marginTop: 50,
    textAlign: 'center',
  },
  emptyAddBtn: {
    marginTop: 30,
  },
};

const selectContacts = memoize((contacts) =>
  contacts
    ? Object.entries(contacts)
        .map(([name, contact]) => ({ name, ...contact }))
        .sort((a, b) => a.name.localeCompare(b.name))
    : []
);

const filterContacts = memoize((contacts, keyword) => {
  const kw = keyword.toLowerCase();
  return contacts.filter((contact) => contact.name.toLowerCase().includes(kw));
});

function NoContacts() {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text sub style={styles.emptyMessage}>
        You don't have any contact yet
      </Text>
      <FAB
        style={styles.emptyAddBtn}
        icon="plus"
        onPress={() => {
          navigate('NewContact');
        }}
        label="Add contact"
      />
    </View>
  );
}

function NoResults() {
  return (
    <View>
      <Text sub style={styles.emptyMessage}>
        No matching results
      </Text>
    </View>
  );
}

export default function ContactsScreen() {
  const contacts = useSelector((state) => selectContacts(state.contacts));
  const search = useSelector((state) => state.ui.contactSearch);
  const filteredContacts =
    search && typeof search === 'string'
      ? filterContacts(contacts, search)
      : contacts;

  return (
    <ScreenBody
      style={styles.wrapper}
      scroll={false}
      style={{ paddingVertical: 10 }}
    >
      <FlatList
        data={filteredContacts}
        ItemSeparatorComponent={Divider}
        keyExtractor={(contact) => contact.name}
        renderItem={({ item }) => <Contact contact={item} />}
        ListEmptyComponent={contacts?.length ? NoResults : NoContacts}
      />
      {!!contacts?.length && (
        <FAB
          style={styles.addBtn}
          icon="plus"
          onPress={() => {
            navigate('NewContact');
          }}
        />
      )}
    </ScreenBody>
  );
}

ContactsScreen.nav = ({ contactSearch, theme }) => ({
  name: 'Contacts',
  options: {
    title: 'Contacts',
    headerTitle:
      typeof contactSearch === 'string'
        ? () => (
            <TextBox
              background={theme.dark ? 'surface' : 'primary'}
              value={contactSearch}
              onChangeText={setContactSearch}
              autoFocus
              dense
              placeholder="Search contact"
            />
          )
        : 'Contacts',
    // headerTitleAlign: 'left',
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
  // listeners: {
  //   blur: () => {
  //     if (typeof contactSearch === 'string') {
  //       setContactSearch(null);
  //     }
  //   },
  // },
});

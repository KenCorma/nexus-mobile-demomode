import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { IconButton, Portal, Dialog } from 'react-native-paper';

import SvgIcon from 'components/SvgIcon';
import Text from 'components/Text';
import Divider from 'components/Divider';
import memoize from 'utils/memoize';
import AddressBookIcon from 'icons/address-book.svg';
import Contact from './Contact';

const selectContacts = memoize((state) =>
  Object.entries(state.contacts).map(([name, address]) => ({ name, address }))
);

export default function ContactsSelector({ setAddress, style }) {
  const [contactsOpen, setContactsOpen] = React.useState(false);
  const contacts = useSelector(selectContacts);
  return (
    <>
      <IconButton
        style={style}
        icon={() => <SvgIcon icon={AddressBookIcon} size={16} />}
        onPress={async () => {
          setContactsOpen(true);
        }}
      />
      <Portal>
        <Dialog
          visible={contactsOpen}
          onDismiss={() => {
            setContactsOpen(false);
          }}
        >
          <Dialog.Title>
            <Text>Choose from Contacts</Text>
          </Dialog.Title>
          <Dialog.ScrollArea>
            <FlatList
              data={contacts}
              ItemSeparatorComponent={Divider}
              keyExtractor={(contact) => contact.name}
              renderItem={({ item }) => (
                <Contact
                  contact={item}
                  onSelect={(address) => {
                    setAddress(address);
                    setContactsOpen(false);
                  }}
                />
              )}
            />
          </Dialog.ScrollArea>
        </Dialog>
      </Portal>
    </>
  );
}

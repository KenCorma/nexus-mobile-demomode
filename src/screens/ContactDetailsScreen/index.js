import React from 'react';
import { Platform, Clipboard } from 'react-native';
import styled from '@emotion/native';
import { Button } from 'react-native-paper';
import { useTheme } from 'emotion-theming';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Formik, Field } from 'formik';
import * as yup from 'yup';

import ScreenBody from 'components/ScreenBody';
import { Surface, Text, SubText } from 'components/Adaptive';
import TextBox from 'components/TextBox';
import SvgIcon from 'components/SvgIcon';
import { showNotification } from 'lib/notifications';
import { navigate } from 'lib/navigation';
import { updateContact } from 'lib/contacts';
import { lighten, darken } from 'utils/color';
import segmentAddress from 'utils/segmentAddress';
import CopyIcon from 'icons/copy.svg';
import SendIcon from 'icons/send.svg';

const Wrapper = styled(ScreenBody)({
  paddingVertical: 30,
  paddingHorizontal: 30,
});

const ContactInfo = styled.View({
  alignItems: 'center',
  marginBottom: 50,
});

const Avatar = styled.View(({ theme }) => ({
  backgroundColor: theme.dark
    ? lighten(theme.surface, 0.6)
    : darken(theme.surface, 0.15),
  width: 120,
  height: 120,
  borderRadius: 60,
  alignItems: 'center',
  justifyContent: 'center',
}));

const AvatarLetter = styled(SubText)({
  textTransform: 'uppercase',
  fontSize: 63,
});

const ContactName = styled(Text)({
  fontSize: 30,
  marginTop: 20,
});

const AddressLabelWrapper = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const AddressBox = styled(Surface)({
  borderRadius: 4,
  paddingVertical: 12,
  marginTop: 5,
});

const Address = styled(Text)({
  fontSize: 15,
  textAlign: 'center',
});

const getinitial = (name) => (name && name.length >= 1 ? name.charAt(0) : '');

function NormalMode({ startEditing }) {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const contact = route.params?.contact;
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          mode="text"
          color={theme.dark ? theme.primary : theme.onPrimary}
          onPress={() => {
            startEditing();
          }}
        >
          Edit
        </Button>
      ),
    });
  }, []);
  return (
    <>
      <ContactInfo>
        <Avatar>
          <AvatarLetter>{getinitial(contact.name)}</AvatarLetter>
        </Avatar>
        <ContactName>{contact.name}</ContactName>
      </ContactInfo>

      <AddressLabelWrapper>
        <SubText>Address</SubText>
        <Button
          mode="text"
          icon={(props) => <SvgIcon icon={CopyIcon} {...props} />}
          labelStyle={{ fontSize: 12 }}
          onPress={() => {
            Clipboard.setString(contact.address);
            showNotification('Copied to clipboard');
          }}
        >
          Copy
        </Button>
      </AddressLabelWrapper>
      <AddressBox>
        <Address mono>{segmentAddress(contact.address)}</Address>
      </AddressBox>

      <Button
        mode="text"
        uppercase={false}
        icon={(props) => <SvgIcon icon={SendIcon} {...props} />}
        onPress={() => {
          navigate('Send');
        }}
        style={{ marginTop: 30 }}
      >
        Send to {contact.name}
      </Button>
    </>
  );
}

function EditMode({ endEditing, isEditing, handleSubmit }) {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const contact = route.params?.contact;
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          mode="text"
          disabled={isEditing}
          color={theme.dark ? theme.primary : theme.onPrimary}
          onPress={() => {
            handleSubmit();
          }}
        >
          Done
        </Button>
      ),
    });
  }, []);
  return (
    <>
      <ContactInfo>
        <Avatar>
          <AvatarLetter>{getinitial(contact.name)}</AvatarLetter>
        </Avatar>
      </ContactInfo>
      <TextBox.Formik
        name="name"
        mode="underlined"
        defaultValue={contact.name}
        label="Contact name"
        style={{ alignSelf: 'stretch' }}
      />
      <TextBox.Formik
        name="address"
        mode="underlined"
        defaultValue={contact.address}
        label="Address"
      />
      <Button
        mode="contained"
        color={theme.danger}
        style={{ marginTop: 60, alignSelf: 'center' }}
      >
        Delete contact
      </Button>
    </>
  );
}

export default function ContactDetailsScreen({ navigation, route }) {
  const [editing, setEditing] = React.useState(false);
  const contact = route.params?.contact;
  return (
    <Wrapper>
      {editing ? (
        <Formik
          initialValues={{
            name: contact.name || '',
            address: contact.address || '',
          }}
          validationSchema={yup.object().shape({
            name: yup.string().required('Required!'),
          })}
          onSubmit={async ({ name, address }) => {
            try {
              await updateContact(contact.name, { name, address });
              // reload contact
              navigation.setParams({ contact: { name, address } });
              setEditing(false);
            } catch (err) {
              // Show error modal
            }
          }}
        >
          {(props) => (
            <EditMode
              {...props}
              endEditing={() => {
                setEditing(false);
              }}
            />
          )}
        </Formik>
      ) : (
        <NormalMode
          startEditing={() => {
            setEditing(true);
          }}
        />
      )}
    </Wrapper>
  );
}

ContactDetailsScreen.nav = {
  name: 'ContactDetails',
  options: {
    title: Platform.OS === 'ios' ? 'Contact' : 'Contact Details',
  },
};

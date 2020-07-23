import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import { FAB, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import Text from 'components/Text';
import TextBox from 'components/TextBox';
import SvgIcon from 'components/SvgIcon';
import { refreshCoreInfo, selectConnected } from 'lib/coreInfo';
import { useTheme } from 'lib/theme';
import { navigate } from 'lib/navigation';
import { selectLoggedIn, refreshUserStatus } from 'lib/user';
import { sendAPI } from 'lib/api';
import { showError } from 'lib/user';
import { flatHeader } from 'utils/styles';
import SettingsIcon from 'icons/settings.svg';
import UnuthenticatedBase from './UnuthenticatedBase';
import AuthenticatedBase from './AuthenticatedBase';

export default function BaseScreen({ route, navigation }) {
  const theme = useTheme();
  const loggedIn = useSelector(selectLoggedIn);
  const txFilterOpen = useSelector((state) => state.ui.txFilterOpen);
  const contactSearch = useSelector((state) => state.ui.contactSearch);
  React.useLayoutEffect(() => {
    if (loggedIn) {
      const options = AuthenticatedBase.stackOptions({
        theme,
        navigation,
        txFilterOpen,
        contactSearch,
        route,
      });
      navigation.setOptions(options);
    } else {
      const options = UnuthenticatedBase.stackOptions({
        theme,
      });
      navigation.setOptions(options);
    }
  }, [route, theme, loggedIn, txFilterOpen, contactSearch, navigation]);

  return loggedIn ? <AuthenticatedBase /> : <UnuthenticatedBase />;
}

BaseScreen.nav = {
  name: 'Base',
};

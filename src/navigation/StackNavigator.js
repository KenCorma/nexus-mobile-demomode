import React from 'react';
import styled from '@emotion/native';
import { StatusBar } from 'react-native';
import { createStackNavigator, Header } from '@react-navigation/stack';
import { shadow, IconButton } from 'react-native-paper';
import { useTheme } from 'emotion-theming';

import { Icon, BackgroundComponentFactory } from 'components/Typo';
import ReceiveScreen from 'screens/ReceiveScreen';
import SendScreen from 'screens/SendScreen';
import SettingsScreen from 'screens/SettingsScreen';
import TokensScreen from 'screens/TokensScreen';
import NamesScreen from 'screens/NamesScreen';
import NamespacesScreen from 'screens/NamespacesScreen';
import AssetsScreen from 'screens/AssetsScreen';
import { navigate } from 'lib/navigation';
import MenuIcon from 'icons/menu.svg';
import SettingsIcon from 'icons/settings.svg';
import LogoIcon from 'icons/logo-full.svg';
import BottomTabNavigator from './BottomTabNavigator';
import { screens, defaultScreen } from './bottomTabScreens';

const Logo = styled(LogoIcon)(({ theme }) => ({
  color: theme.dark ? theme.primary : theme.onPrimary,
  height: 25,
  width: 110,
}));

const BottomNavHeader = BackgroundComponentFactory(Header);

const Stack = createStackNavigator();

export default function StackNavigator({ navigation: drawerNavigation }) {
  const theme = useTheme();
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.dark ? '#000' : theme.primaryVariant}
      />
      <Stack.Navigator
        initialRouteName="BottomNav"
        headerMode="screen"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.dark ? theme.surface : theme.primary,
            elevation: 4,
            ...shadow(3),
          },
          headerTintColor: theme.dark ? theme.foreground : theme.onPrimary,
          // Fix header background color not changing when theme is changed
          header: (props) => (
            <BottomNavHeader
              {...props}
              style={{
                backgroundColor: theme.dark ? theme.surface : theme.primary,
              }}
            />
          ),
          // headerBackImage: ({ tintColor }) => (
          //   <IconButton
          //     icon="arrow-left"
          //     color={tintColor}
          //     rippleColor={tintColor}
          //     size={25}
          //   />
          // ),
        }}
      >
        <Stack.Screen
          name="BottomNav"
          component={BottomTabNavigator}
          options={({ route }) => {
            const routeName =
              route.state?.routes[route.state.index]?.name ?? defaultScreen;
            const screen = screens.find((screen) => screen.name === routeName);
            const customOptions =
              typeof screen.stackOptions === 'function'
                ? screen.stackOptions({ theme })
                : screen.stackOptions;

            return {
              headerLeft: ({ tintColor }) => (
                <IconButton
                  icon={({ size }) => <Icon icon={MenuIcon} size={size} />}
                  color={tintColor}
                  size={25}
                  onPress={() => {
                    drawerNavigation.openDrawer();
                  }}
                />
              ),
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon={({ size }) => <Icon icon={SettingsIcon} size={size} />}
                  color={tintColor}
                  size={25}
                  onPress={() => {
                    navigate('Settings');
                  }}
                />
              ),
              ...customOptions,
            };
          }}
        />
        <Stack.Screen name="Receive" component={ReceiveScreen} />
        <Stack.Screen name="Send" component={SendScreen} />
        {/* <Stack.Screen name="Transactions" component={TransactionsScreen} /> */}
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Tokens" component={TokensScreen} />
        <Stack.Screen name="Names" component={NamesScreen} />
        <Stack.Screen name="Namespaces" component={NamespacesScreen} />
        <Stack.Screen name="Assets" component={AssetsScreen} />
      </Stack.Navigator>
    </>
  );
}

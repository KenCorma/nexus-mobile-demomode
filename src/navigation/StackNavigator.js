import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { IconButton } from "react-native-paper";
import { useTheme } from "emotion-theming";

import SettingsScreen from "screens/SettingsScreen";
import TokensScreen from "screens/TokensScreen";
import NamesScreen from "screens/NamesScreen";
import NamespacesScreen from "screens/NamespacesScreen";
import AssetsScreen from "screens/AssetsScreen";
import { navigate } from "navigation/container";

import { screens, defaultScreen } from "./bottomTabScreens";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator();

const getRouteName = (route) =>
  route.state?.routes[route.state.index]?.name ?? defaultScreen;

function BottomNavScreen({ navigation: stackNavigation, route }) {
  const routeName = getRouteName(route);
  const screen = screens.find((screen) => screen.name === routeName);
  stackNavigation.setOptions(screen?.stackOptions);
  return <BottomTabNavigator />;
}

export default function StackNavigator({ navigation: drawerNavigation }) {
  const theme = useTheme();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomNav"
        component={BottomNavScreen}
        options={{
          headerLeft: () => (
            <IconButton
              icon="menu"
              color={theme.foregroundEmphasis}
              size={25}
              onPress={() => {
                drawerNavigation.openDrawer();
              }}
            />
          ),
          headerRight: () => (
            <IconButton
              icon="settings"
              color={theme.foregroundEmphasis}
              size={25}
              onPress={() => {
                navigate("Settings");
              }}
            />
          ),
        }}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Tokens" component={TokensScreen} />
      <Stack.Screen name="Names" component={NamesScreen} />
      <Stack.Screen name="Namespaces" component={NamespacesScreen} />
      <Stack.Screen name="Assets" component={AssetsScreen} />
    </Stack.Navigator>
  );
}

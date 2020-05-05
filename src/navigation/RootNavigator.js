import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTheme } from "emotion-theming";

import { getNavTheme } from "lib/theme";

import SideMenu from "./SideMenu";
import StackNavigator from "./StackNavigator";
import { navContainerRef } from "./container";

const Drawer = createDrawerNavigator();

export default function RootNavigator({ initialNavigationState }) {
  const theme = useTheme();
  const navTheme = getNavTheme(theme);
  return (
    <NavigationContainer
      ref={navContainerRef}
      initialState={initialNavigationState}
      theme={navTheme}
    >
      <Drawer.Navigator drawerContent={(props) => <SideMenu {...props} />}>
        <Drawer.Screen name="StackNav" component={StackNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import * as React from "react";
import styled from "@emotion/native";
import { useTheme } from "emotion-theming";

import { DEFAULT_SCREEN, screens } from "./bottomTabScreens";
import Component from "components/Component";

const BottomTab = createMaterialBottomTabNavigator();

const TabBarIcon = styled(Component)({
  width: 25,
  height: 25,
});

const renderScreen = ({ name, component, IconComponent }) => (
  <BottomTab.Screen
    key={name}
    name={name}
    component={component}
    options={{
      title: name,
      tabBarIcon: ({ color }) => (
        <TabBarIcon as={IconComponent} style={{ color }} />
      ),
      tabBarLabel: name,
    }}
  />
);

export default function BottomTabNavigator() {
  const theme = useTheme();
  return (
    <BottomTab.Navigator initialRouteName={DEFAULT_SCREEN} shifting={false}>
      {screens.map((screen) => renderScreen(screen))}
    </BottomTab.Navigator>
  );
}

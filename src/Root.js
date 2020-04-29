import * as React from "react";
import { Platform, StatusBar, YellowBox } from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";

import { ThemeProvider } from "emotion-theming";
import styled from "@emotion/native";

import { darkTheme } from "constants/themes";

import { navContainerRef } from "./navigation/rootNavigator";
import DrawerNavigator from "./navigation/DrawerNavigator";
import useLinking from "./navigation/useLinking";

YellowBox.ignoreWarnings(["Remote debugger"]);

const Container = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.background,
}));

export default function Root(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const { getInitialState } = useLinking(navContainerRef);
  console.log(navContainerRef.current);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          ...MaterialIcons.font,
          "noto-sans": require("./fonts/NotoSans-Regular.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <ThemeProvider theme={darkTheme}>
        <Container>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <NavigationContainer
            ref={navContainerRef}
            initialState={initialNavigationState}
          >
            <DrawerNavigator />
          </NavigationContainer>
        </Container>
      </ThemeProvider>
    );
  }
}

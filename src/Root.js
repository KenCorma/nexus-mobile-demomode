import React from "react";
import { Platform, StatusBar } from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ThemeProvider } from "emotion-theming";
import styled from "@emotion/native";
import { Provider as PaperProvider } from "react-native-paper";
import { useTheme } from "emotion-theming";

import { darkTheme, getPaperTheme } from "lib/theme";

import RootNavigator from "./navigation/RootNavigator";
import { navContainerRef } from "./navigation/container";
import useLinking from "./navigation/useLinking";

const Container = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.background,
}));

function PaperContainer({ children }) {
  const theme = useTheme();
  return <PaperProvider theme={getPaperTheme(theme)}>{children}</PaperProvider>;
}

export default function Root(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const { getInitialState } = useLinking(navContainerRef);

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
          "noto-sans-bold": require("./fonts/NotoSans-Bold.ttf"),
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
        <PaperContainer>
          <Container>
            <StatusBar barStyle="default" animated />
            <RootNavigator initialNavigationState={initialNavigationState} />
          </Container>
        </PaperContainer>
      </ThemeProvider>
    );
  }
}

import { DefaultTheme, DarkTheme } from 'react-native-paper';

import { mix, fade } from 'utils/color';
import memoize from 'utils/memoize';

const darkColor = '#121212';
const lightColor = '#ffffff';
const dangerColor = '#8f240e';
const primaryShades = {
  50: '#e2f2ff',
  100: '#badfff',
  200: '#8acbff',
  300: '#53b6ff',
  400: '#19a6ff',
  500: '#0095ff',
  600: '#0086ff',
  700: '#0073f7',
  800: '#1261e4',
  900: '#1f3fc5',
};
const primaryDark = '#0049c3';

const elevatedDarkColors = {
  0: darkColor,
  1: mix(darkColor, lightColor, 0.05),
  2: mix(darkColor, lightColor, 0.07),
  3: mix(darkColor, lightColor, 0.08),
  4: mix(darkColor, lightColor, 0.09),
  6: mix(darkColor, lightColor, 0.11),
  8: mix(darkColor, lightColor, 0.12),
  12: mix(darkColor, lightColor, 0.14),
  16: mix(darkColor, lightColor, 0.15),
  24: mix(darkColor, lightColor, 0.16),
};
// const lightColor = "rgb(239,240,236)";
// const lightPrimaryColor = "rgb(0,183,250)";
// const darkPrimaryColor = "rgb(8,154,207)";
// const dangerColor = "rgb(143,36,14)";

// // ...
// // shade(-2)  => mix(background, foreground, 0.125)
// // shade(-1)  => mix(background, foreground, 0.25)
// // shade(0)   => mix(background, foreground, 0.5) (midground color)
// // shade(1)   => mix(background, foreground, 0.75)
// // shade(2)   => mix(background, foreground, 0.875)
// // ...
// const getShade = (mixer) => {
//   const cache = [];
//   return (index) => {
//     if (!cache[index]) {
//       const ratio = index < 0 ? 0.5 ** (-index + 1) : 1 - 0.5 ** (index + 1);
//       cache[index] = mixer(ratio);
//     }
//     return cache[index];
//   };
// };

export function subColor(color) {
  return fade(color, 0.34);
}

export function disabledColor(color) {
  return fade(color, 0.62);
}

export const darkTheme = {
  dark: true,
  background: elevatedDarkColors[1],
  foreground: lightColor,
  surface: elevatedDarkColors[4],
  primary: primaryShades[300],
  primaryVariant: primaryShades[400],
  onPrimary: darkColor,
  danger: dangerColor,
  onDanger: lightColor,
  subColor,
  disabledColor,
};

export const lightTheme = {
  dark: false,
  background: lightColor,
  foreground: darkColor,
  surface: lightColor,
  primary: primaryShades[700],
  onPrimary: lightColor,
  primaryVariant: primaryDark,
  danger: dangerColor,
  onDanger: lightColor,
  subColor,
  disabledColor,
};

export const getNavTheme = memoize((theme) => ({
  dark: theme.dark,
  colors: {
    background: theme.background,
    border: theme.background,
    card: theme.surface,
    primary: theme.primary,
    text: theme.foreground,
  },
}));

export const getPaperTheme = memoize((theme) => ({
  ...(theme.dark ? DarkTheme : DefaultTheme),
  dark: theme.dark,
  mode: 'adaptive',
  roundness: 4,
  colors: {
    background: theme.background,
    backdrop: 'rgba(0,0,0,0.5)',
    surface: theme.surface,
    text: theme.foreground,
    onBackground: theme.foreground,
    onSurface: theme.foreground,
    disabled: disabledColor(theme.foreground),
    primary: theme.primary,
    accent: theme.primary,
    error: theme.danger,
    placeholder: fade(theme.foreground, 0.46),
    disabled: fade(theme.foreground, 0.74),
    notification: theme.primary,
  },
  fonts: {
    thin: {
      fontFamily: 'noto-sans',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'noto-sans',
      fontWeight: 'normal',
    },
    regular: {
      fontFamily: 'noto-sans',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'noto-sans-bold',
      fontWeight: 'bold',
    },
  },
}));

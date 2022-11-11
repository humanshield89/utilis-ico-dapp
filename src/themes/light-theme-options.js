// Colors

const neutral = {
  50: "#fbfbfb",
  100: "#f7f7f7",
  200: "#f1f1f1",
  300: "#e5e5e5",
  400: "#c2c2c2",
  500: "#a4a4a4",
  600: "#7a7a7a",
  700: "#666666",
  800: "#474747",
  900: "#252525",
};

const background = {
  default: neutral[100],
  paper: neutral[50],
  contrast: neutral[900],
};

const divider = neutral[300];

const secondary = {
  main: "#FFDF00",
  light: "#C6AE00",
  dark: "#9B8800",
  contrastText: neutral[900],
};

const primary = {
  main: "#5EED40",
  light: "#3EE71B",
  dark: "#26DD00",
  contrastText: neutral[900],
};

const success = {
  main: "#14B8A6",
  light: "#43C6B7",
  dark: "#0E8074",
  contrastText: "#FFFFFF",
};

const info = {
  main: "#2196F3",
  light: "#64B6F7",
  dark: "#0B79D0",
  contrastText: "#FFFFFF",
};

const warning = {
  main: "#FFB020",
  light: "#FFBF4C",
  dark: "#B27B16",
  contrastText: "#FFFFFF",
};

const error = {
  main: "#D14343",
  light: "#DA6868",
  dark: "#922E2E",
  contrastText: "#FFFFFF",
};

const text = {
  main: neutral[900],
  primary: neutral[900],
  secondary: neutral[600],
  disabled: neutral[400],
  contrastText: neutral[50],
};

const lightThemeOptions = {
  palette: {
    action: {
      active: neutral[500],
      focus: "rgba(55, 65, 81, 0.12)",
      hover: "rgba(55, 65, 81, 0.04)",
      selected: "rgba(55, 65, 81, 0.08)",
      disabledBackground: "rgba(55, 65, 81, 0.12)",
      disabled: "rgba(55, 65, 81, 0.26)",
    },
    background,
    divider,
    error,
    info,
    mode: "light",
    neutral,
    primary,
    secondary,
    success,
    text,
    warning,
    shadows: [
      "none",
      "0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)",
      "0px 1px 2px rgba(100, 116, 139, 0.12)",
      "0px 1px 4px rgba(100, 116, 139, 0.12)",
      "0px 1px 5px rgba(100, 116, 139, 0.12)",
      "0px 1px 6px rgba(100, 116, 139, 0.12)",
      "0px 2px 6px rgba(100, 116, 139, 0.12)",
      "0px 3px 6px rgba(100, 116, 139, 0.12)",
      "0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)",
      "0px 5px 12px rgba(100, 116, 139, 0.12)",
      "0px 5px 14px rgba(100, 116, 139, 0.12)",
      "0px 5px 15px rgba(100, 116, 139, 0.12)",
      "0px 6px 15px rgba(100, 116, 139, 0.12)",
      "0px 7px 15px rgba(100, 116, 139, 0.12)",
      "0px 8px 15px rgba(100, 116, 139, 0.12)",
      "0px 9px 15px rgba(100, 116, 139, 0.12)",
      "0px 10px 15px rgba(100, 116, 139, 0.12)",
      "0px 12px 22px -8px rgba(100, 116, 139, 0.25)",
      "0px 13px 22px -8px rgba(100, 116, 139, 0.25)",
      "0px 14px 24px -8px rgba(100, 116, 139, 0.25)",
      "0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)",
      "0px 25px 50px rgba(100, 116, 139, 0.25)",
      "0px 25px 50px rgba(100, 116, 139, 0.25)",
      "0px 25px 50px rgba(100, 116, 139, 0.25)",
      "0px 25px 50px rgba(100, 116, 139, 0.25)",
    ],
  },
};

export default lightThemeOptions;

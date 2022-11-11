// Colors

const neutral = {
  0: "#fbfbfb",
  50: "#f7f7f7",
  100: "#f1f1f1",
  200: "#e5e5e5",
  300: "#c2c2c2",
  400: "#a4a4a4",
  500: "#7a7a7a",
  600: "#666666",
  700: "#262626",
  800: "#1E1E1E",
  900: "#121212",
};

const background = {
  default: neutral[900],
  paper: neutral[800],
  contrast: neutral[200],
  contrastText: neutral[900],
};

const divider = neutral[600];

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
  contrastText: neutral[900],
};

const info = {
  main: "#2196F3",
  light: "#64B6F7",
  dark: "#0B79D0",
  contrastText: neutral[900],
};

const warning = {
  main: "#FFB020",
  light: "#FFBF4C",
  dark: "#B27B16",
  contrastText: neutral[900],
};

const error = {
  main: "#F44336",
  light: "#E57373",
  dark: "#D32F2F",
  contrastText: neutral[50],
};

const text = {
  main: "#EDF2F7",
  primary: "#EDF2F7",
  secondary: "#A0AEC0",
  disabled: "rgba(255, 255, 255, 0.48)",
  contrastText: "#2e2e2e",
  buttonText: "#EDF2F7",
};

const darkThemeOptions = {
  palette: {
    action: {
      active: neutral[400],
      hover: "rgba(255, 255, 255, 0.04)",
      selected: "rgba(255, 255, 255, 0.08)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
      disabled: "rgba(255, 255, 255, 0.26)",
    },
    background,
    divider,
    error,
    info,
    mode: "dark",
    neutral,
    primary,
    secondary,
    success,
    text,
    warning,
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: background.default,
          //backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: 8,
          transition: "all 0.3s ease",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 0px 15px 0px " + primary.main,
          },
        },
      },
    },
  },
};

export default darkThemeOptions;

import createTheme from "@mui/material/styles/createTheme";
import { responsiveFontSizes as responsiveFonts } from "@mui/material/styles";
import baseThemeOptions from "./base-theme-options";
import darkThemeOptions from "./dark-theme-options";

/**
 *
 * @param direction{String}
 * @param responsiveFontSizes{boolean}
 * @param themeMode{String}
 */
const createCustomTheme = ({ direction, responsiveFontSizes, themeMode }) => {
  if (direction !== "rtl" && direction !== "ltr") direction = "ltr";

  let theme = createTheme(
    baseThemeOptions,
    themeMode === "dark" ? darkThemeOptions : darkThemeOptions,
    {
      direction: direction,
    }
  );
  if (responsiveFontSizes) {
    theme = responsiveFonts(theme);
  }
  return theme;
};

export default createCustomTheme;

import { Typography, useMediaQuery, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { keyframes } from "@emotion/react";

const GlowingText = ({ text, variant }) => {
  const theme = useTheme();
  // check if mobile or not
  const isMobile = useMediaQuery(theme.breakpoints.between("xs", "sm"));

  const color0 = theme.palette.primary.main;
  const color1 = theme.palette.primary.light;

  const glowKeyframs = keyframes`
      from {
        text-shadow: 0 0 5px #000, 0 0 10px #fff, 0 0 15px ${color0}, 0 0 20px ${color0}, 0 0 25px ${color0}, 0 0 30px ${color0}, 0 0 35px ${color0};
      }
      to {
        text-shadow: 0 0 10px #000, 0 0 15px ${color1}, 0 0 20px ${color1}, 0 0 50px ${color1}, 0 0 30px ${color1}, 0 0 35px ${color1}, 0 0 40px ${color1};
      }
    `;

  return (
    <Typography
      variant={variant ? variant : "h2"}
      sx={{
        textShadow: isMobile
          ? `0 0 5px #000, 0 0 10px #fff, 0 0 15px ${color0}, 0 0 20px ${color0}, 0 0 25px ${color0}, 0 0 30px ${color0}, 0 0 35px ${color0}`
          : "none",
        animation: isMobile
          ? "none"
          : `${glowKeyframs} 1s ease-in-out infinite alternate`,
        textAlign: "center",
        marginTop: "1.5rem",
        marginBottom: "1.5rem",
      }}
    >
      {text}
    </Typography>
  );
};

GlowingText.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.oneOf([
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "subtitle1",
    "subtitle2",
    "body1",
    "body2",
    "button",
    "caption",
    "overline",
    "srOnly",
    "inherit",
  ]),
};

export default GlowingText;

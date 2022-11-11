import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { keyframes } from "@emotion/react";
import { useTheme } from "@mui/system";

const barLoad = keyframes`
    from {
        transform: scaleX(0);
    }
    to {
        transform: scaleX(1);
    }
    `;

export const FillBar = ({ percentage }) => {
  const theme = useTheme();

  return (
    <Box
      style={{
        animationDelay: 0.2 + "s",
        flexGrow: "1",
      }}
      sx={{
        animationName: `${barLoad}`,
        animationDuration: "3s",
        animationFillMode: "both",
        animationTimingFunction: "cubic-bezier(0.6, 0.2, 0.1, 1)",
        transformOrigin: "left",
      }}
    >
      <Box
        style={{
          backgroundColor: theme.palette.secondary.light,
          background: `linear-gradient(270deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
          width: `${100 - percentage}%`,
          color: "yellow",
          fontWeight: 700,
        }}
        sx={{
          minHeight: "6px",
          borderRadius: 12,
          textAlign: "center",
          fontSize: "0.8rem",
        }}
      >
        {(100 - percentage).toFixed(2) + "%"}
      </Box>
    </Box>
  );
};

FillBar.propTypes = {
  percentage: PropTypes.number,
};

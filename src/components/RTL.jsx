import { useEffect } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
/**
 * Component to wrap the app with RTL support
 * @param props{children: JSX.Element, direction: string}
 * @returns {JSX.Element}
 * @constructor
 */
const RTL = ({ children, direction }) => {
  useEffect(() => {
    document.dir = direction ? direction : "ltr";
  }, [direction]);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      {children}
    </Box>
  );
};

RTL.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(["ltr", "rtl"]),
};

export default RTL;

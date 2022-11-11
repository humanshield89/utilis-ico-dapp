import Box from "@mui/material/Box";
import { BarredProgress } from "@dailycodeltd/ermu";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";

const LoadingPage = ({ boxProps, progressProps, typographyProps }) => {
  return (
    <Box
      id={"myID"}
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      {...boxProps}
    >
      <BarredProgress color={"secondary"} width={75} {...progressProps} />
      <Typography variant="body1" sx={{ fontWeight: 300 }} {...typographyProps}>
        Loading resources...
      </Typography>
    </Box>
  );
};

LoadingPage.propTypes = {
  boxProps: PropTypes.object,
  progressProps: PropTypes.object,
  typographyProps: PropTypes.object,
};

export default LoadingPage;

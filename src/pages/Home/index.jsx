import Page from "../../components/Page";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import MouseRotatedCard from "../../components/MouseRotatedCard";
import GlowingText from "../../components/GlowingText";
import CountdownTimer from "../../components/CountdownTimer";
import { FillBar } from "../../components/FillBar";
import { useTheme } from "@mui/system";
import PropTypes from "prop-types";

const bnb = new URL(
  "../../../public/token-icons/bnb.png?png&width=48&height=48",
  import.meta.url
).href;
const usdt = new URL(
  "../../../public/token-icons/usdt.png?png&width=48&height=48",
  import.meta.url
).href;

const multiple = 100;

const Icon = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      width={28}
      height={28}
      style={{ marginRight: 6 }}
    />
  );
};

Icon.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

const HomePage = () => {
  // check if mobile

  const CardEl = ({ children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    console.log("isMobile", isMobile);
    if (isMobile) {
      return (
        <Box
          sx={{
            p: 3,
            borderStyle: "solid",
            borderColor: "primary.main",
            borderRadius: "20px",
            boxShadow: "0px 0px 32px 0px rgb(7 255 32 / 50%)",
            backgroundColor: (theme) => theme.palette.background.paper + "11",
            backdropFilter: "blur(5px)",
            margin: "auto",
            width: "100%",
          }}
        >
          {children}
        </Box>
      );
    } else {
      return (
        <MouseRotatedCard
          sx={{
            p: 3,
            borderStyle: "solid",
            borderColor: "primary.main",
            borderRadius: "20px",
            boxShadow: "0px 0px 32px 0px rgb(7 255 32 / 50%)",
            backgroundColor: (theme) => theme.palette.background.paper + "11",
            backdropFilter: "blur(5px)",
            margin: "auto",
            width: "fit-content",
          }}
          denominator={multiple}
        >
          {children}
        </MouseRotatedCard>
      );
    }
  };
  CardEl.propTypes = {
    children: PropTypes.node.isRequired,
  };
  return (
    <Page title={"Home"}>
      <Box sx={{ minHeight: 20 }} />
      <GlowingText text={"Utilis Pre-Launch Sale"} />
      <Box sx={{ minHeight: 40 }} />
      <CardEl denominator={multiple}>
        <Typography variant={"h3"} sx={{ textAlign: "center" }}>
          Pre-Launch of UTILIS Token
        </Typography>
        <Typography
          variant={"h4"}
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            p: 0,
          }}
        >
          <CountdownTimer date={Date.now() / 1000 + 5 * 60 * 60 * 24} />
        </Typography>
        <Box sx={{ minHeight: 20 }} />
        <FillBar percentage={0} />
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Typography
            variant={"subtitle2"}
            sx={{ textAlign: "left", flex: 1, pl: 1 }}
          >
            Reached: $1,000.00
          </Typography>
          <Typography
            variant={"subtitle2"}
            sx={{ textAlign: "right", flex: 1, pr: 1 }}
          >
            $100,000.00
          </Typography>
        </Box>

        <Typography sx={{ mt: "20px", textAlign: "center" }} variant={"h4"}>
          Enter The Presale
        </Typography>
        <Box sx={{ minHeight: 20 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant={"contained"}
            sx={{ fontWeight: 800, minWidth: "49%" }}
          >
            <Icon src={bnb} alt={"bnb-logo"} /> BNB
          </Button>
          <Button
            variant={"contained"}
            sx={{ fontWeight: 800, minWidth: "49%" }}
          >
            <Icon src={usdt} alt={"bnb-logo"} /> USDT
          </Button>
        </Box>
      </CardEl>
    </Page>
  );
};

export default HomePage;

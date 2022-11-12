import Page from "../../components/Page";
import {
  Box,
  Button,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MouseRotatedCard from "../../components/MouseRotatedCard";
import GlowingText from "../../components/GlowingText";
import CountdownTimer from "../../components/CountdownTimer";
import { FillBar } from "../../components/FillBar";
import { useTheme } from "@mui/system";
import PropTypes from "prop-types";
import usePreSale from "../../hooks/PreLaunch/usePresale";
import { useERC20Balance, useWalletContext } from "@dailycodeltd/ermu";
import { useEffect, useState } from "react";
import React from "react";
import Link from "@mui/material/Link";
import useTokensPrice from "../../hooks/Uniswap/useTokenPrice";
import useNoSlipagePrice from "../../hooks/PreLaunch/useNoSlipagePrice";
import { useBalance } from "@web3modal/react";

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
  const walletContext = useWalletContext();
  const [started, setStarted] = React.useState(false);
  const [ended, setEnded] = React.useState(false);
  const presale = usePreSale({
    address: process.env.PRESALE_ADDRESS,
    provider: walletContext.signer
      ? walletContext.signer
      : walletContext.provider,
  });
  const path = [process.env.WBNB_ADDRESS, process.env.USDT_ADDRESS];

  const [amountIn, setAmountIn] = useState(10n ** 18n);

  const tokensPricesWithSlippage = useTokensPrice({
    routerAddress: process.env.ROUTER_ADDRESS,
    provider: walletContext.provider,
    path,
    amountIn: amountIn,
  });

  const noSlippagePrice = useNoSlipagePrice({
    pairAddress: process.env.WBNB_USET_PAIR_ADDRESS,
    provider: walletContext.provider,
    tokenA: process.env.WBNB_ADDRESS,
    tokenB: process.env.USDT_ADDRESS,
  });

  const bnbBalance = useBalance({ addressOrName: walletContext.address });

  const usdtBalance = useERC20Balance({
    tokenAddress: process.env.USDT_ADDRESS,
    provider: walletContext.provider,
    userAddress: walletContext.address,
  });

  useEffect(() => {
    console.log(
      "tokensPrices",
      tokensPricesWithSlippage,
      setAmountIn,
      noSlippagePrice
    );
  }, [tokensPricesWithSlippage]);

  useEffect(() => {
    const now = Date.now() / 1000;
    console.log(
      "presale.startTime?.data?.seconds < now",
      presale.startTime?.data?.seconds < now
    );
    console.log(
      "presale.endTime?.data?.seconds < now",
      presale.endTime?.data?.seconds < now
    );
    if (presale.startTime?.data?.seconds < now) {
      console.log("startTime", presale.startTime?.data?.seconds);
      setStarted(true);
    }
    if (presale.endTime?.data?.seconds < now) {
      console.log("endTime", presale.endTime?.data?.seconds);
      setEnded(true);
    }
  }, [presale.startTime?.data?.seconds, presale.endTime?.data?.seconds]);

  return (
    <Page title={"Pre-Launch"}>
      <Box sx={{ minHeight: 20 }} />
      <GlowingText text={"Utilis Pre-Launch Sale"} />
      <Box sx={{ minHeight: 40 }} />
      <CardEl denominator={multiple}>
        <Typography variant={"h3"} sx={{ textAlign: "center" }}>
          Pre-Launch of UTILIS Token
        </Typography>
        <Typography
          variant={"h5"}
          sx={{
            color: (theme) => theme.palette.text.secondary,
            textAlign: "center",
          }}
        >
          {started ? "Pre-Launch Ends In:" : "Pre-Launch Starts In:"}
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
          <CountdownTimer
            date={
              !started
                ? presale.startTime?.isSuccess
                  ? presale?.startTime?.data?.seconds
                  : 0
                : presale.endTime?.isSuccess && !ended
                ? presale?.endTime?.data?.seconds
                : 0
            }
          />
        </Typography>
        <Box sx={{ minHeight: 20 }} />
        <Box style={{ background: "grey", borderRadius: 8 }}>
          <FillBar percentage={100 - 33.62} />
        </Box>
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

        <Typography
          sx={{
            mt: "20px",
            textAlign: "center",
            color: (theme) => theme.palette.text.secondary,
          }}
          variant={"h5"}
        >
          Enter The Presale
        </Typography>
        <Box
          sx={{
            textAlign: "center",
            mt: "20px",
          }}
        >
          <Typography variant={"body2"}>
            1 USDT = 100 Utilis
            <br />1 BNB = 27000 Utilis
          </Typography>
        </Box>

        <Box sx={{ minHeight: 20 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Button
            fullWidth
            variant={"outlined"}
            sx={{
              fontWeight: 700,
              pt: "12px",
              pb: "12px",
              borderRadius: "8px",
              borderWidth: 2,
              "&:hover": {
                borderWidth: 2,
              },
            }}
          >
            <Icon src={bnb} alt={"bnb-logo"} /> Buy with BNB
          </Button>
          <Button
            fullWidth
            variant={"outlined"}
            sx={{
              fontWeight: 700,
              pt: "12px",
              pb: "12px",
              borderRadius: "8px",
              borderWidth: 2,
              "&:hover": {
                borderWidth: 2,
              },
            }}
          >
            <Icon src={usdt} alt={"bnb-logo"} /> Buy with USDT
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: "20px",
            fontSize: "0.8em",
          }}
        >
          <span>
            BNB Balance:{" "}
            <b>
              {bnbBalance.data?.formatted?.substring(
                0,
                bnbBalance?.data?.formatted.indexOf(".") + 3
              )}
            </b>{" "}
            $BNB
          </span>
          {usdtBalance.isSuccess ? (
            <span>
              Usdt Balance:{" "}
              <b>
                {usdtBalance?.data?.formatted?.substring(
                  0,
                  usdtBalance?.data?.formatted.indexOf(".") + 3
                )}
              </b>{" "}
              $USDT
            </span>
          ) : (
            <Skeleton sx={{ minWidth: 50 }} />
          )}
        </Box>
        <Box
          sx={{
            fontSize: "0.7em",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link href={process.env.GET_BNB} target={"_blank"}>
            GET BNB
          </Link>
          <Link href={process.env.GET_USDT} target={"_blank"}>
            GET USDT
          </Link>
        </Box>
      </CardEl>
    </Page>
  );
};

export default HomePage;

const CardEl = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.between("xs", "sm"));
  console.log("isMobile", isMobile);
  if (isMobile) {
    return (
      <Box
        sx={{
          p: isMobile ? 1 : 3,
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
          p: isMobile ? 2 : 3,
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
        maxAngle={2}
      >
        {children}
      </MouseRotatedCard>
    );
  }
};
CardEl.propTypes = {
  children: PropTypes.node.isRequired,
};

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
import {
  BarredProgress,
  ConnectButton,
  useERC20Allowance,
  useERC20Balance,
  useWalletContext,
} from "@dailycodeltd/ermu";
import { useEffect, useState } from "react";
import React from "react";
import Link from "@mui/material/Link";
import useNoSlipagePrice from "../../hooks/PreLaunch/useNoSlipagePrice";
import { useAccount } from "@web3modal/react";
import { BuyModal } from "../../components/MaxTextField";
import useSalePrice from "../../hooks/PreLaunch/useSalePrice";
import useTotalSale from "../../hooks/PreLaunch/useTotalSale";
import useTotalSold from "../../hooks/PreLaunch/useTotalSold";
import useERC20Calls from "@dailycodeltd/ermu/lib/esm/hooks/ERC20/useERC20Calls";
import { ethers } from "ethers";
import { useSnackbar } from "notistack";

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
  const [busy, setBusy] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const walletContext = useWalletContext();
  const [started, setStarted] = React.useState(false);
  const [ended, setEnded] = React.useState(false);
  const account = useAccount();

  const presale = usePreSale({
    address: process.env.PRESALE_ADDRESS,
    provider: walletContext.provider,
  });
  const usdtPrice = useSalePrice({
    address: process.env.PRESALE_ADDRESS,
    provider: walletContext.provider,
  });

  const totalSale = useTotalSale({
    address: process.env.PRESALE_ADDRESS,
    provider: walletContext.provider,
  });

  const soldAmount = useTotalSold({
    address: process.env.PRESALE_ADDRESS,
    provider: walletContext.provider,
  });

  const noSlippagePrice = useNoSlipagePrice({
    pairAddress: process.env.WBNB_USET_PAIR_ADDRESS,
    provider: walletContext.provider,
    tokenA: process.env.WBNB_ADDRESS,
    tokenB: process.env.USDT_ADDRESS,
  });

  const usdtAllowance = useERC20Allowance({
    tokenAddress: process.env.USDT_ADDRESS,
    provider: walletContext.provider,
    ownerAddress: walletContext.address,
    spenderAddress: process.env.PRESALE_ADDRESS,
  });

  const ercCalls = useERC20Calls();

  const [selectedCurrency, setSelectedCurrency] = useState();

  const [bnbBalance, setBnbBalance] = useState({ data: {} });

  useEffect(() => {
    if (account.isReady) {
      walletContext.provider
        .getBalance(walletContext.address)
        .then((balance) => {
          setBnbBalance({
            data: {
              value: balance,
              decimals: 18,
              formatted: ethers.utils.formatUnits(balance, 18),
            },
          });
        });
    }
  }, [account.isReady]);

  useEffect(() => {
    console.log("bnbBalance", bnbBalance);
  }, [bnbBalance]);

  const usdtBalance = useERC20Balance({
    tokenAddress: process.env.USDT_ADDRESS,
    provider: walletContext.provider,
    userAddress: walletContext.address,
  });

  useEffect(() => {
    const now = Date.now() / 1000;

    if (presale.startTime?.data?.seconds < now) {
      setStarted(true);
    }
    if (presale.endTime?.data?.seconds < now) {
      setEnded(true);
    }
  }, [presale.startTime?.data?.seconds, presale.endTime?.data?.seconds]);

  const handleBuy = (currency) => {
    let sc;
    if (currency === "BNB") {
      sc = {
        currency: {
          name: "BNB",
          icon: bnb,
        },
        balance: bnbBalance.data,
        decimals: bnbBalance.data?.decimals,
      };
    } else {
      sc = {
        currency: {
          name: "USDT",
          icon: usdt,
        },
        decimals: usdtBalance.data?.decimals,
        balance: usdtBalance.data,
      };
    }
    sc["open"] = true;
    setSelectedCurrency(sc);
  };

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
          {
            <CountdownTimer
              date={
                !started
                  ? presale?.startTime?.data
                    ? presale?.startTime?.data?.seconds
                    : 0
                  : presale?.endTime?.data && !ended
                  ? presale?.endTime?.data?.seconds
                  : 0
              }
            />
          }
        </Typography>
        <Box sx={{ minHeight: 20 }} />
        <Box style={{ background: "grey", borderRadius: 8 }}>
          <FillBar
            percentage={
              totalSale.data?.formatted &&
              soldAmount?.data?.formatted &&
              totalSale.data?.amount > 0
                ? // eslint-disable-next-line no-unsafe-optional-chaining
                  totalSale?.data?.amount
                    ?.sub(soldAmount?.data?.amount)
                    .mul(100n) / totalSale?.data?.amount
                : 0
            }
          />
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
            {soldAmount.data?.formatted && usdtPrice?.data?.formatted ? (
              "Reached $" +
              Number(soldAmount?.data?.formatted) *
                Number(usdtPrice?.data?.formatted)
            ) : (
              <Skeleton />
            )}
          </Typography>
          <Typography
            variant={"subtitle2"}
            sx={{ textAlign: "right", flex: 1, pr: 1 }}
          >
            {totalSale.data?.formatted && usdtPrice?.data?.formatted ? (
              "$" +
              (
                Number(totalSale?.data?.formatted) *
                Number(usdtPrice?.data?.formatted)
              ).toFixed(0)
            ) : (
              <Skeleton />
            )}
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
            1 $USDT ={" "}
            {1 / Number(usdtPrice.data?.formatted) +
              " $" +
              process.env.TOKEN_SYMBOL}
            <br />1 $BNB ={" "}
            {Number(noSlippagePrice?.tokenAPrice?.formatted) /
              Number(usdtPrice.data?.formatted) +
              " $" +
              process.env.TOKEN_SYMBOL}
          </Typography>
        </Box>

        <Box sx={{ minHeight: 20 }} />

        {!walletContext.isConnected && (
          <>
            <ConnectButton
              chainId={process.env.NEXT_PUBLIC_CHAIN_ID}
              color={"primary"}
              fullwidth
              sx={{ width: "100%" }}
            />
            <Box sx={{ minHeight: 20 }} />
          </>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Button
            disabled={
              busy ||
              !started ||
              ended ||
              !totalSale ||
              totalSale?.data?.amount == soldAmount?.data?.amount ||
              bnbBalance?.data?.value == 0 ||
              !walletContext.isConnected
            }
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
            onClick={() => handleBuy("BNB")}
          >
            <Icon src={bnb} alt={"bnb-logo"} /> Buy with BNB
          </Button>
          <Button
            disabled={
              busy ||
              !started ||
              ended ||
              !totalSale ||
              totalSale?.data?.amount == soldAmount?.data?.amount ||
              usdtBalance?.data?.amount == 0 ||
              !walletContext.isConnected
            }
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
            onClick={async () => {
              if (
                usdtBalance.data?.amount &&
                usdtAllowance.data?.amount?.gte(usdtBalance.data?.amount)
              ) {
                handleBuy("USDT");
              } else {
                // approve
                setBusy(true);
                try {
                  console.log(
                    await account?.account.connector?.getSigner({
                      chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
                    })
                  );
                  await ercCalls.approve(
                    process.env.USDT_ADDRESS,
                    await account?.account.connector?.getSigner({
                      chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
                    }),
                    process.env.PRESALE_ADDRESS,
                    ethers.constants.MaxUint256
                  );
                  enqueueSnackbar("USDT Approved", { variant: "info" });
                  await usdtAllowance.refetch();
                } catch (e) {
                  console.log(e);
                  enqueueSnackbar("Error while approving", {
                    variant: "error",
                  });
                } finally {
                  setBusy(false);
                }
              }
            }}
          >
            {!busy ? (
              usdtBalance.data?.amount &&
              usdtAllowance.data?.amount?.gte(usdtBalance.data?.amount) ? (
                <>
                  <Icon src={usdt} alt={"bnb-logo"} />
                  <span>Buy with USDT</span>
                </>
              ) : (
                <>
                  <Icon src={usdt} alt={"bnb-logo"} />
                  <span>Enable USDT</span>
                </>
              )
            ) : (
              <BarredProgress size={20} />
            )}
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
          {bnbBalance?.data?.value ? (
            <span>
              Balance:{" "}
              <b>
                {bnbBalance.data?.formatted?.substring(
                  0,
                  bnbBalance?.data?.formatted.indexOf(".") + 3
                )}
              </b>{" "}
              $BNB
            </span>
          ) : (
            <Skeleton sx={{ minWidth: 50 }} />
          )}
          {usdtBalance.isSuccess ? (
            <span>
              Balance:{" "}
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
      {selectedCurrency?.open && (
        <BuyModal
          decimals={selectedCurrency?.decimals}
          open={selectedCurrency?.open}
          setOpen={() =>
            setSelectedCurrency((old) => {
              return { ...old, open: !old.open };
            })
          }
          balance={selectedCurrency?.balance}
          currency={selectedCurrency?.currency}
        />
      )}
    </Page>
  );
};

export default HomePage;

const CardEl = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.between("xs", "sm"));

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobile]);

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

import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import PropTypes from "prop-types";
import { BarredProgress, useWalletContext } from "@dailycodeltd/ermu";
import { useEffect, useState } from "react";
import useSalePrice from "../hooks/PreLaunch/useSalePrice";
import uniGetAmountOut from "../ethersUtils/UniRouterUtils/uniGetAmountOut";
import { ethers } from "ethers";
import utilisPreLaunchBuyWithUSDT from "../ethersUtils/saleUtils/UtilisPreLaunchBuyWithUSDT";
import { useSnackbar } from "notistack";
import utilisPreLaunchBuyWithBNB from "../ethersUtils/saleUtils/UtilisPreLaunchBuyWithBNB";
import useMinBuy from "../hooks/PreLaunch/useMinBuy";
import { useAccount } from "@web3modal/react";

export const BuyModal = ({ open, setOpen, decimals, currency, balance }) => {
  const [value, setValue] = useState("0");
  const [useMax, setUseMax] = useState(false);
  const [busy, setBusy] = useState(false);
  const [inError, setInError] = useState("");
  const [waitingForNetwork] = useState(false);
  const walletContext = useWalletContext();
  const { account } = useAccount();

  const minBuy = useMinBuy({
    address: process.env.PRESALE_ADDRESS,
    provider: walletContext.provider,
  });

  const [amountOut, setAmountOut] = useState();
  const path = [process.env.WBNB_ADDRESS, process.env.USDT_ADDRESS];

  const { enqueueSnackbar } = useSnackbar();

  const salePrice = useSalePrice({
    address: process.env.PRESALE_ADDRESS,
    provider: walletContext.provider,
  });

  useEffect(() => {
    updateAmountOut(currency.name);
  }, [value, useMax]);

  useEffect(() => {
    if (Number(amountOut?.formatted) < Number(minBuy.data?.formatted)) {
      setInError(
        `Minimum buy is ${minBuy.data?.formatted} ${process.env.TOKEN_SYMBOL}`
      );
    } else {
      if (!useMax && Number(value) > Number(balance.formatted)) {
        setInError("Exceeded Balance");
      } else {
        setInError("");
      }
    }
  }, [amountOut]);

  const updateAmountOut = async (currency) => {
    if (
      Number(value) === 0 ||
      !value ||
      Number(value) > Number(balance.formatted)
    ) {
      setAmountOut({
        amount: ethers.BigNumber.from(0),
        formatted: "0.00",
        decimals: 18,
      });
      return;
    }
    if (currency === "BNB") {
      const usdtOut = await uniGetAmountOut(
        process.env.ROUTER_ADDRESS,
        walletContext.provider,
        ethers.utils.parseUnits(value, decimals),
        path
      );

      const out = usdtOut[1].mul(10n ** 18n).div(salePrice.data?.amount);
      setAmountOut({
        amount: out,
        formatted: ethers.utils.formatUnits(out, 18),
        decimals: 18,
      });
    } else {
      const out = ethers.utils
        .parseUnits(value, decimals)
        .mul(10n ** 18n)
        .div(salePrice.data?.amount);
      setAmountOut({
        amount: out,
        formatted: ethers.utils.formatUnits(out, 18),
        decimals: 18,
      });
    }
  };

  const handleBuy = async () => {
    setBusy(true);
    try {
      let amount;
      let tx;
      if (currency?.name === "BNB") {
        amount = useMax
          ? balance.amount.sub(process.env.MIN_BNB_LEFT_IN_WALLET)
          : ethers.utils.parseUnits(value, decimals);
        tx = await utilisPreLaunchBuyWithBNB(
          process.env.PRESALE_ADDRESS,
          await account.connector.getSigner({
            chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
          }),
          amount
        );
      } else {
        amount = useMax
          ? balance.amount
          : ethers.utils.parseUnits(value, decimals);
        tx = await utilisPreLaunchBuyWithUSDT(
          process.env.PRESALE_ADDRESS,
          await account.connector.getSigner({
            chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
          }),
          amount
        );
      }

      await tx.wait();
      enqueueSnackbar("Transaction Successful", {
        variant: "success",
      });
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error" });
    } finally {
      setBusy(false);
      setOpen(false);
    }
  };

  return (
    <AmountDialog
      decimals={decimals}
      title={
        waitingForNetwork
          ? "Reading On Chain Data..."
          : "Buy " + process.env.TOKEN_NAME
      }
      value={value}
      inError={inError}
      maxAmount={balance?.value ? balance?.value : balance?.amount}
      setUseMax={setUseMax}
      setValue={setValue}
      busy={busy}
      handleAction={handleBuy}
      open={open}
      setOpen={setOpen}
      amountOut={amountOut}
      currency={currency}
    />
  );
};

BuyModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  decimals: PropTypes.number.isRequired,
  currency: PropTypes.object.isRequired,
  balance: PropTypes.object.isRequired,
};
/**
 *
 * @param title
 * @param decimals
 * @param inError
 * @param value
 * @param setValue
 * @param setUseMax
 * @param maxAmount
 * @param setOpen
 * @param open
 * @param handleAction
 * @param busy
 * @param amountOut
 * @returns {JSX.Element}
 * @constructor
 */
export const AmountDialog = ({
  title,
  decimals,
  inError,
  value,
  setValue,
  setUseMax,
  maxAmount,
  setOpen,
  open,
  handleAction,
  busy,
  amountOut,
}) => {
  return (
    <Dialog
      fullWidth
      maxWidth={"xs"}
      open={open}
      onClose={() => {
        setOpen(false);
        setValue("0");
      }}
      PaperProps={{
        style: {
          backgroundColor: "paper",
          borderRadius: 5,
        },
      }}
      sx={{
        backdropFilter: "blur(5px)",
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main + "aa",
        }}
      >
        {title}
      </DialogTitle>

      <DialogContent dividers sx={{ padding: 1, pt: 2 }}>
        {false && (
          <Alert
            severity={"info"}
            style={{
              marginTop: 6,
              marginBottom: 24,
            }}
          >{`Current Balance: ${formatLongNumber(
            Number(maxAmount) / 10 ** decimals,
            2
          )}`}</Alert>
        )}

        <FormControl
          error={!!inError}
          fullWidth
          color={
            "primary"
          } /*className={clsx(classes.margin, classes.textField)}*/
          variant="outlined"
        >
          <InputLabel>Amount</InputLabel>
          <OutlinedInput
            label={"Amount"}
            type={"number"}
            fullWidth
            value={value}
            onChange={(event) => {
              setValue(
                Number(event.target.value) || Number(event.target.value) === 0
                  ? event.target.value
                  : value
              );
              setUseMax(false);
            }}
            onFocus={() => {
              if (value == 0) {
                setValue("");
              }
            }}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  style={{ color: "green" }}
                  onClick={() => {
                    setValue("" + Number(maxAmount) / 10 ** decimals);
                    setUseMax(true);
                  }}
                >
                  Use Max
                </Button>
              </InputAdornment>
            }
          />
          <FormHelperText>{`Current Balance: ${
            maxAmount ? ethers.utils.formatUnits(maxAmount, decimals) : 0
          }`}</FormHelperText>
        </FormControl>
        {!!inError && (
          <Alert severity={"error"} style={{ marginTop: 6, marginBottom: 6 }}>
            {inError}
          </Alert>
        )}
        {!!true && (
          <Alert severity={"info"} style={{ marginTop: 6, marginBottom: 6 }}>
            {"Will receive " +
              "" +
              truncNumber(amountOut?.formatted, 2) +
              " $" +
              process.env.TOKEN_NAME}
          </Alert>
        )}
        <Grid container spacing={2} style={{ marginTop: 6 }}>
          <Grid item xs={12} md={6}>
            <Button
              variant={"contained"}
              fullWidth
              color={"primary"}
              disabled={busy || !!inError || !value || Number(value) === 0}
              onClick={handleAction}
            >
              {busy && <BarredProgress />}
              {title}
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              color={"primary"}
              variant={"contained"}
              fullWidth
              disabled={busy}
              onClick={() => {
                setOpen(false);
                setValue("0");
              }}
              text={"Cancel"}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

AmountDialog.propTypes = {
  title: PropTypes.string.isRequired,
  decimals: PropTypes.number.isRequired,
  inError: PropTypes.string.isRequired || PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  setUseMax: PropTypes.func.isRequired,
  maxAmount: PropTypes.object.isRequired,
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  handleAction: PropTypes.func.isRequired,
  busy: PropTypes.bool.isRequired,
  amountOut: PropTypes.object,
};

export const formatLongNumber = (n, decimals) => {
  if (!n) return 0;
  n = Number(n);
  if (n < 1e3) return +n.toFixed(decimals);
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(decimals) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(decimals) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(decimals) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(decimals) + "T";
};

export const truncNumber = (n, decimals) => {
  if (!n) return "0.00";
  // substring only two decimals after .
  return n.toString().substring(0, n.toString().indexOf(".") + decimals + 1);
};
/**
 *
 * @param num{Number | String}
 * @returns {string}
 */
export function eToNumber(num) {
  let sign = "";
  (num += "").charAt(0) == "-" && ((num = num.substring(1)), (sign = "-"));
  let arr = num.split(/[e]/gi);
  if (arr.length < 2) {
    return sign + num;
  }
  let dot = (0.1).toLocaleString().substr(1, 1),
    n = arr[0],
    exp = +arr[1],
    w = (n = n.replace(/^0+/, "")).replace(dot, ""),
    pos = n.split(dot)[1] ? n.indexOf(dot) + exp : w.length + exp,
    L = pos - w.length,
    // eslint-disable-next-line no-undef
    s = "" + BigInt(w);
  w =
    exp >= 0
      ? L >= 0
        ? s + "0".repeat(L)
        : r()
      : pos <= 0
      ? "0" + dot + "0".repeat(Math.abs(pos)) + s
      : r();
  L = w.split(dot);
  if ((L[0] == 0 && L[1] == 0) || (+w == 0 && +s == 0)) {
    w = 0;
  } //** added 9/10/2021
  return sign + w;

  function r() {
    return w.replace(new RegExp(`^(.{${pos}})(.)`), `$1${dot}$2`);
  }
}

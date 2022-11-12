import uniPairGetTokenOrder from "../../ethersUtils/pairUtils/UniPairGetTokenOrder";
import usePairReserves from "./usePairReserves";
import { useEffect, useState } from "react";
import useERC20MultiDecimals from "../ERC20/useERC20MultiDecimals";
import { BigNumber, ethers } from "ethers";

const useNoSlipagePrice = ({ pairAddress, provider, tokenA, tokenB }) => {
  const [token0, token1] = uniPairGetTokenOrder(tokenA, tokenB);

  const decimals = useERC20MultiDecimals({
    tokenAddresses: [tokenA, tokenB],
    provider,
  });

  const reserves = usePairReserves({ address: pairAddress, provider });

  const [tokenAPrice, setTokenAPrice] = useState(undefined);
  const [tokenBPrice, setTokenBPrice] = useState(undefined);

  useEffect(() => {
    const decimal0 = decimals.getDecimal(token0);
    const decimalA = decimals.getDecimal(tokenA);
    const decimal1 = decimals.getDecimal(token1);
    const decimalB = decimals.getDecimal(tokenB);

    if (reserves.data && !!decimal0 && !!decimal1) {
      const { reserve0, reserve1 } = reserves.data;
      console.log("decimal0", decimal0);
      console.log("decimal1", decimal1);
      console.log("reserve0/reserve1", reserve0 / reserve1);
      console.log("reserve0/reserve1", reserve1 / reserve0);
      BigNumber.from(10).toBigInt();
      let priceA;
      let priceB;
      if (token0 == tokenA) {
        // means tokenA is 0 and tokenB is 1
        // price of tokenA in token2 will be
        priceA = reserve1.mul(10n ** decimal0.toBigInt()).div(reserve0);
        priceB = reserve0.mul(10n ** decimal1.toBigInt()).div(reserve1);
      } else {
        priceA = reserve0.mul(10n ** decimal1.toBigInt()).div(reserve1);
        priceB = reserve1.mul(10n ** decimal0.toBigInt()).div(reserve0);
      }
      setTokenAPrice({
        amount: priceA,
        formatted: ethers.utils.formatUnits(priceA, decimalA),
        decimals: decimalA,
      });

      setTokenBPrice({
        amount: priceB,
        formatted: ethers.utils.formatUnits(priceB, decimalB),
        decimals: decimalB,
      });
    }
  }, [
    reserves.data?.reserve0,
    reserves.data?.reserve1,
    decimals.decimals.isSuccess,
  ]);

  return {
    reserves,
    tokenAPrice,
    tokenBPrice,
  };
};

export default useNoSlipagePrice;

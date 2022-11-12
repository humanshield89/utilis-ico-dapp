import extractChainId from "../../ethersUtils/extractChainId";
import { useQuery } from "react-query";
import { erc20Decimals } from "@dailycodeltd/ermu";
import { BigNumber } from "ethers";

/**
 *
 * @param tokenAddresses{[string]}
 * @param provider{import('ethers').providers.BaseProvider | import('ethers').providers.JsonRpcSigner}
 */
const useERC20MultiDecimals = ({ tokenAddresses, provider }) => {
  const chainId = extractChainId(provider);

  const decimals = useQuery(
    [chainId, "erc20", "decimals", tokenAddresses],
    async () => {
      const arr = [];
      await Promise.all(
        tokenAddresses.map(async (address, index) => {
          /**
           * @type {import('ethers').providers.}
           */
          const dc = BigNumber.from(await erc20Decimals(address, provider));
          // lets map the values to the same index we received and also to an {address: decimal}
          // this way the user of this hook can use it as they see fit
          arr[address] = dc;
          arr[index] = dc;
        })
      );

      return arr;
    },
    {
      enabled: !!tokenAddresses && tokenAddresses.length > 0 && !!provider,
    }
  );

  /**
   * @param addressOrIndex
   * @returns {*|import('ethers').BigNumber}
   */
  const getDecimal = (addressOrIndex) => {
    return decimals?.data ? decimals.data[addressOrIndex] : undefined;
  };

  return {
    decimals,
    getDecimal,
  };
};

export default useERC20MultiDecimals;

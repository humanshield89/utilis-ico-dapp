import { useERC20Decimals } from "@dailycodeltd/ermu";
import { useQuery } from "react-query";
import extractChainId from "../../ethersUtils/extractChainId";
import UtilisPreLaunchGetMaxBuy from "../../ethersUtils/saleUtils/UtilisPreLaunchGetMaxBuy";
import { ethers } from "ethers";

/**
 *
 * @param address{String}
 * @param provider{import('ethers').providers.BaseProvider}
 */
const useMaxBuy = ({ address, provider }) => {
  const chainId = extractChainId(provider);

  const decimals = useERC20Decimals({
    tokenAddress: process.env.UTILIS_ADDRESS,
    provider: provider,
  });

  return useQuery(
    [chainId, address, "presale", "maxBuy"],
    async () => {
      const max = await UtilisPreLaunchGetMaxBuy(address, provider);

      return {
        amount: max,
        formatted: ethers.utils.formatUnits(max, decimals.data),
        decimals: Number(decimals.data),
      };
    },
    {
      enabled: !!address && !!provider && decimals.isSuccess,
    }
  );
};

export default useMaxBuy;

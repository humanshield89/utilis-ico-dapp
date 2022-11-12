import { useERC20Decimals } from "@dailycodeltd/ermu";
import extractChainId from "../../ethersUtils/extractChainId";
import { useQuery } from "react-query";
import UtilisPreLaunchGetMinBuy from "../../ethersUtils/saleUtils/UtilisPreLaunchGetMinBuy";
import { ethers } from "ethers";

const useMinBuy = ({ address, provider }) => {
  const chainId = extractChainId(provider);

  const decimals = useERC20Decimals({
    tokenAddress: process.env.UTILIS_ADDRESS,
    provider,
  });

  return useQuery(
    [chainId, address, "presale", "useMinBuy"],
    async () => {
      const min = await UtilisPreLaunchGetMinBuy(address, provider);

      return {
        amount: min,
        formatted: ethers.utils.formatUnits(min, decimals.data),
        decimals: Number(decimals.data),
      };
    },
    {
      enabled: !!address && !!provider && decimals.isSuccess,
    }
  );
};

export default useMinBuy;

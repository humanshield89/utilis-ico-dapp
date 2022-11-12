import extractChainId from "../../ethersUtils/extractChainId";
import { useERC20Decimals } from "@dailycodeltd/ermu";
import { useQuery } from "react-query";
import UtilisPreLaunchgetTotalSold from "../../ethersUtils/saleUtils/UtilisPreLaunchgetTotalSold";
import { ethers } from "ethers";

const useTotalSold = ({ address, provider }) => {
  const chainId = extractChainId(provider);

  const decimals = useERC20Decimals({
    tokenAddress: process.env.UTILIS_ADDRESS,
    provider: provider,
  });

  return useQuery(
    [chainId, address, "presale", "totalSold"],
    async () => {
      const sold = await UtilisPreLaunchgetTotalSold(address, provider);

      return {
        amount: sold,
        formatted: ethers.utils.formatUnits(sold, decimals.data),
        decimals: decimals.data.toNumber(),
      };
    },
    {
      enabled: !!address && !!provider && decimals.isSuccess,
    }
  );
};

export default useTotalSold;

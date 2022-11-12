import extractChainId from "../../ethersUtils/extractChainId";
import UtilisPreLaunchGetTotalPresale from "../../ethersUtils/saleUtils/UtilisPreLaunchGetTotalPresale";
import { ethers } from "ethers";
import { useERC20Decimals } from "@dailycodeltd/ermu";
import { useQuery } from "react-query";

const useTotalSale = ({ address, provider }) => {
  const chainId = extractChainId(provider);

  const decimals = useERC20Decimals({
    tokenAddress: process.env.UTILIS_ADDRESS,
    provider,
  });

  const totalSale = useQuery(
    [chainId, address, "presale", "totalSale"],
    async () => {
      const total = await UtilisPreLaunchGetTotalPresale(address, provider);

      return {
        amount: total,
        formated: ethers.utils.formatUnits(total, decimals?.data),
        decimals: Number(decimals.data),
      };
    },
    {
      enabled: !!provider && !address && !!chainId && decimals.isSuccess,
    }
  );

  return totalSale;
};

export default useTotalSale;

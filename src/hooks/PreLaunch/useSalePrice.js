import { useERC20Decimals } from "@dailycodeltd/ermu";
import { useQuery } from "react-query";
import extractChainId from "../../ethersUtils/extractChainId";
import UtilisPreLaunchGetUSDTPrice from "../../ethersUtils/saleUtils/UtilisPreLaunchGetUSDTPrice";
import { ethers } from "ethers";

const useSalePrice = ({ address, provider }) => {
  const chainId = extractChainId(provider);

  const decimals = useERC20Decimals({
    tokenAddress: process.env.USDT_ADDRESS,
    provider,
  });

  return useQuery(
    [chainId, address, "presale", "salePrice"],
    async () => {
      const salePrice = await UtilisPreLaunchGetUSDTPrice(address, provider);

      return {
        amount: salePrice,
        formatted: ethers.utils.formatUnits(salePrice, decimals.data),
        decimals: decimals.data,
      };
    },
    {
      enabled: !!provider && !address && decimals.isSuccess,
    }
  );
};

export default useSalePrice;

import extractChainId from "../../ethersUtils/extractChainId";
import { useQuery } from "react-query";
import UniPairgetReserves from "../../ethersUtils/pairUtils/UniPairgetReserves";

/**
 *
 * @param address
 * @param provider
 * @returns {import("react-query").UseQueryResult<{reserve0, reserve1, blockTimestampLast}, unknown>}
 */
const usePairReserves = ({ address, provider }) => {
  const chainId = extractChainId(provider);

  return useQuery(
    [chainId, address, "pair", "reserves"],
    async () => {
      return await UniPairgetReserves(address, provider);
    },
    {
      enabled: !!address && !!provider && !!chainId,
    }
  );
};

export default usePairReserves;

import { useQuery } from "react-query";
import utilisPreLaunchGetStartTime from "../../ethersUtils/saleUtils/UtilisPreLaunchGetStartTime";
import PropTypes from "prop-types";
import extractChainId from "../../ethersUtils/extractChainId";

/**
 * @param address{String}
 * @param provider{import('ethers').providers.BaseProvider | import('ethers').providers.JsonRpcSigner}
 * @returns {{isLoadingError: false | true, errorUpdateCount: number, data: {seconds: number, date: Date}, isRefetching: boolean, isRefetchError: false | true, isFetching: boolean, isPlaceholderData: boolean, refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>)) => Promise<QueryObserverResult<*, unknown>>, error: unknown, remove: () => void, isFetchedAfterMount: boolean, isLoading: false | true, errorUpdatedAt: number, dataUpdatedAt: number, isError: false | true, isPreviousData: boolean, isFetched: boolean, isIdle: true | false, isStale: boolean, failureCount: number, isSuccess: false | true, status: "idle" | "error" | "loading" | "success"}}
 */
const useStartDate = ({ address, provider }) => {
  const chainId = extractChainId(provider);

  return useQuery(
    [chainId, address, "presale", "startDate"],
    async () => {
      const start = await utilisPreLaunchGetStartTime(address, provider);
      return {
        seconds: start.toNumber(),
        date: new Date(start.toNumber() * 1000),
      };
    },
    {
      enabled: !!provider && !!chainId && !!address,
    }
  );
};

useStartDate.propTypes = {
  address: PropTypes.string.isRequired,
  provider: PropTypes.object.isRequired,
};

export default useStartDate;

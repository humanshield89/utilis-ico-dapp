import { useQuery } from "react-query";
import PropTypes from "prop-types";
import extractChainId from "../../ethersUtils/extractChainId";
import utilisPreLaunchGetEndTime from "../../ethersUtils/saleUtils/UtilisPreLaunchGetEndTime";

/**
 * @param address{String}
 * @param provider{import('ethers').providers.BaseProvider | import('ethers').providers.JsonRpcSigner}
 * @returns {{isLoadingError: false | true, errorUpdateCount: number, data: {seconds: number, date: Date}, isRefetching: boolean, isRefetchError: false | true, isFetching: boolean, isPlaceholderData: boolean, refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>)) => Promise<QueryObserverResult<*, unknown>>, error: unknown, remove: () => void, isFetchedAfterMount: boolean, isLoading: false | true, errorUpdatedAt: number, dataUpdatedAt: number, isError: false | true, isPreviousData: boolean, isFetched: boolean, isIdle: true | false, isStale: boolean, failureCount: number, isSuccess: false | true, status: "idle" | "error" | "loading" | "success"}}
 */
const useEndDate = ({ address, provider }) => {
  const chainId = extractChainId(provider);

  return useQuery(
    [chainId, address, "presale", "endTime"],
    async () => {
      const end = await utilisPreLaunchGetEndTime(address, provider);
      return {
        seconds: end.toNumber(),
        date: new Date(end.toNumber() * 1000),
      };
    },
    {
      enabled: !!provider && !!chainId && !!address,
    }
  );
};

useEndDate.propTypes = {
  address: PropTypes.string.isRequired,
  provider: PropTypes.object.isRequired,
};

export default useEndDate;

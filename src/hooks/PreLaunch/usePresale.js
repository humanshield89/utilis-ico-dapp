import useStartDate from "./useStartDate";
import useEndDate from "./useEndDate";

const usePreSale = ({ address, provider }) => {
  const startTime = useStartDate({
    address,
    provider,
  });
  const endTime = useEndDate({
    address,
    provider,
  });

  return { startTime, endTime };
};

export default usePreSale;

import { getBookings } from "@/services/apiBookings.js";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";

function useBookings() {
  const [searchParms] = useSearchParams();
  //FILTER
  const filterValue = searchParms.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  //SORTBY
  const sortyByRaw = searchParms.get("sortBy") || "startDate-desc";
  const [field, direction] = sortyByRaw.split("-");

  const sortBy = { field, direction };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });
  return { isLoading, bookings, error };
}

export default useBookings;

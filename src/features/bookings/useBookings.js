import { getBookings } from "@/services/apiBookings.js";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

function useBookings() {
  const [searchParams] = useSearchParams();
  //FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  //SORTBY
  const sortyByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortyByRaw.split("-");
  const sortBy = { field, direction };

  //PAGINATION
  const page = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // const bookings = data?.data ?? [];
  // const count = data?.count ?? 0;

  return { isLoading, bookings, error, count };
}

export default useBookings;

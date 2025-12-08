import { getBookingsAfterDate } from "@/services/apiBookings.js";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = searchParams.get("last")
    ? parseInt(searchParams.get("last"), 10)
    : 7;

  const queryDate = useMemo(() => {
    return subDays(new Date(), numDays).toISOString();
  }, [numDays]);

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", numDays], // stable key
    queryFn: () => getBookingsAfterDate(queryDate),
    keepPreviousData: true,
  });

  return { isLoading, bookings, error };
}

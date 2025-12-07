import { updateBooking } from "@/services/apiBookings.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) => {
      return updateBooking(bookingId, {
        status: "checked-out",
      });
    },
    onSuccess: (data, variables) => {
      const bookingId = variables;
      toast.success(`Booking #${data?.id ?? bookingId} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: () => {
      toast.error("There was an error while checking out");
    },
  });

  return { checkout, isCheckingOut };
}

export default useCheckout;

import { createEditCabin } from "@/services/apiCabins.js";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ editedCabinData, id }) =>
      createEditCabin(editedCabinData, id),
    onSuccess: () => {
      toast.success("Cabin edited sucessfully!");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      toast.error("Error! Couldn't edit cabin");
      console.error(error);
    },
  });
  return { editCabin, isEditing };
}

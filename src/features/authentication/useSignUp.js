import { signUp as signUpApi } from "@/services/apiAuth.js";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account sucessfully created! Please verify the new account from the user's email address."
      );
    },
  });

  return { signUp, isPending };
}

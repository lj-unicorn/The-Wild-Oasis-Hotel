import { login as loginApi } from "@/services/apiAuth.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }) => {
      return loginApi({ email, password });
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Provided email or password are incorrect ");
    },
  });

  return { login, isLoading };
}

export default useLogin;

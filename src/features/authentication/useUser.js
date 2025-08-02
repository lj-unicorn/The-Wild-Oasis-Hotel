import { getCurrentUser } from "@/services/apiAuth.js";
import { useQuery } from "@tanstack/react-query";

function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  return { user, isLoading, isAuthenticated: Boolean(user) };
}

export default useUser;

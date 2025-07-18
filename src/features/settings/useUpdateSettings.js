import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "@/services/apiSettings.js";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSettings, isPending: isSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Settings updated sucessfully!");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (error) => {
      toast.error("Error! Couldn't update settings.");
      console.error(error);
    },
  });
  return { updateSettings, isSetting };
}

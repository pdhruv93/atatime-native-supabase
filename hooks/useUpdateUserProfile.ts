import { useAuthStore, type User } from "@/store/AuthStore";
import { supabase } from "@/utils/supabase";
import { useShowToast } from "./useShowToast";
import { useUtilityStore } from "@/store/UtilityStore";
import { useShallow } from "zustand/react/shallow";

export function useUpdateUserProfile() {
  const { generateToast } = useShowToast();
  const [user, updateUserProfileLocally] = useAuthStore(
    useShallow((s) => [s.loggedInUser, s.updateUserProfileLocally])
  );
  const [setIsLoading] = useUtilityStore(useShallow((s) => [s.setIsLoading]));

  const updateProfileToSupabase = async (newProfileData: Partial<User>) => {
    console.log("Uploading User profile to Supabase storage...");
    setIsLoading(true);

    const updatedProfileData = {
      ...newProfileData,
      is_complete: Boolean(newProfileData.display_name || user?.display_name),
    };

    const { error } = await supabase
      .from("user_profile")
      .update(updatedProfileData)
      .eq("user_id", user?.user_id);

    if (error) {
      generateToast("profile-update", "error", error.message);
      return;
    }

    generateToast("profile-update", "success", "Profile Updated");
    updateUserProfileLocally(updatedProfileData);
    setIsLoading(false);
  };

  return { updateProfileToSupabase };
}

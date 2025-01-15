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
    const { error } = await supabase
      .from("user_profile")
      .update(newProfileData)
      .eq("user_id", user?.user_id);

    if (error) {
      generateToast("profile-update", "error", error.message);
      return;
    }

    generateToast("profile-update", "success", "Profile Updated");
    updateUserProfileLocally(newProfileData);
    setIsLoading(false);
  };

  return { updateProfileToSupabase };
}

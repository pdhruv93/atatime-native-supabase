import { useAuthContext } from "@/context/AuthContext";
import { useShowToast } from "@/hooks/useShowToast";
import { supabase } from "@/utils/supabase";
import { launchImageLibraryAsync } from "expo-image-picker";
import { useState } from "react";

export function useChangeProfileImage() {
  const { loggedInUserId, updateUserProfileLocally } = useAuthContext();
  const { generateToast } = useShowToast();
  const [isUploading, setIsUploading] = useState(false);

  const pickAndUploadImage = async () => {
    setIsUploading(true);

    try {
      // No permissions request is necessary for launching the image library
      let result = await launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      if (result.canceled) {
        generateToast("profile-upload", "error", "No image was selected");
        return;
      }

      console.log("Found valid file, preapring upload...");
      const filePath = result.assets[0].uri;
      const fileExt = filePath.split(".").pop();
      const fileName = `${loggedInUserId}.${fileExt}`;

      updateUserProfileLocally({ profile_url: filePath });
    } catch (e) {
      console.error(e);
    } finally {
      setIsUploading(false);
    }
  };

  return { isUploading, pickAndUploadImage };
}

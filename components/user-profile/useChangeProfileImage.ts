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
        generateToast("profile-pic-upload", "error", "No image was selected");
        return;
      }

      console.log("Found valid file, preapring upload...");
      const filePath = result.assets[0].uri;
      const fileExt = filePath.split(".").pop();
      const fileName = `${loggedInUserId}.${fileExt}`;

      // Convert the file URI to blob
      const blob = await fetch(filePath).then((res) => res.blob());

      console.log("Uploading image to Supabase storage...");
      const { error: uploadError } = await supabase.storage
        .from("profile-pictures")
        .upload(fileName, blob, {
          contentType: "image/*",
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        generateToast("profile-pic-upload", "error", uploadError.message);
        return;
      }

      // Update User Profile in DB
      const { error } = await supabase
        .from("user_profile")
        .update({ profile_picture: fileName })
        .eq("user_id", loggedInUserId);

      if (error) {
        generateToast("profile-pic-upload", "error", error.message);
        return;
      }

      updateUserProfileLocally({ profile_picture: filePath });
      generateToast("profile-pic-upload", "success", "Profile Updated");
    } catch (e) {
      console.error(e);
    } finally {
      setIsUploading(false);
    }
  };

  return { isUploading, pickAndUploadImage };
}

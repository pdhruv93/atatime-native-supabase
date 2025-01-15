import { useShowToast } from "@/hooks/useShowToast";
import { supabase } from "@/utils/supabase";
import { launchImageLibraryAsync } from "expo-image-picker";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
import { useUpdateUserProfile } from "@/hooks/useUpdateUserProfile";
import { useAuthStore } from "@/store/AuthStore";
import { useUtilityStore } from "@/store/UtilityStore";
import { useShallow } from "zustand/react/shallow";

export function useChangeProfileImage() {
  const { updateProfileToSupabase } = useUpdateUserProfile();
  const { generateToast } = useShowToast();
  const [user] = useAuthStore(useShallow((s) => [s.loggedInUser]));
  const [setIsLoading] = useUtilityStore(useShallow((s) => [s.setIsLoading]));

  const pickAndUploadImage = async () => {
    if (!user) {
      return;
    }

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
      const fileName = `${user.user_id}.${fileExt}`;

      // Read the file as a Base64-encoded string using Expo's FileSystem
      const base64 = await FileSystem.readAsStringAsync(filePath, {
        encoding: FileSystem.EncodingType.Base64,
      });
      // Decode the Base64 string to an ArrayBuffer
      const arrayBuffer = decode(base64);

      const { error: uploadError } = await supabase.storage
        .from("profile-pictures")
        .upload(fileName, arrayBuffer, {
          contentType: "image/*",
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        generateToast("profile-pic-upload", "error", uploadError.message);
        return;
      }

      updateProfileToSupabase({
        profile_picture: fileName,
        profile_picture_local_path: filePath,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return { pickAndUploadImage };
}

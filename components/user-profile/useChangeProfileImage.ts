import { useAuthContext } from "@/context/AuthContext";
import { useShowToast } from "@/hooks/useShowToast";
import { supabase } from "@/utils/supabase";
import { launchImageLibraryAsync } from "expo-image-picker";
import { useState } from "react";

export function useChangeProfileImage() {
  const { loggedInUserId } = useAuthContext();
  const { generateToast } = useShowToast();
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) {
      generateToast("profile-upload", "error", "No image was selected");
      return;
    }

    setSelectedImageUrl(result.assets[0].uri);
    uploadImage();
  };

  const uploadImage = async () => {
    if (!selectedImageUrl) {
      return;
    }

    try {
      setIsUploading(true);
      const fileExt = selectedImageUrl.split(".").pop();
      const fileName = `${loggedInUserId}.${fileExt}`;
      const filePath = selectedImageUrl;

      // Convert the file URI to blob
      const blob = await fetch(filePath).then((res) => res.blob());

      console.log("Uploading image to Supabase storage...");
      const { error: uploadError } = await supabase.storage
        .from("profile-pictures")
        .upload(fileName, blob, {
          contentType: "image/png",
          cacheControl: "3600",
          upsert: true,
        });

      generateToast(
        "profile-upload",
        uploadError ? "error" : "success",
        uploadError ? uploadError.message : "Profile Updated successfully"
      );

      if (uploadError) {
        return;
      }

      console.log("Getting public URL...");
      const { data } = await supabase.storage
        .from("profile-pictures")
        .getPublicUrl(fileName);

      if (data.publicUrl) {
        setAvatarUrl(data.publicUrl);
      }
    } catch (e) {
    } finally {
      setIsUploading(false);
    }
  };

  return { avatarUrl, isUploading, pickImage };
}

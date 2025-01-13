import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useChangeProfileImage } from "./useChangeProfileImage";
import { UserAvatar } from "./UserAvatar";
import { Box } from "@/components/ui/box";

export function ProfileImage() {
  const { pickAndUploadImage, isUploading } = useChangeProfileImage();

  return (
    <Box>
      <LoadingSpinner isVisible={isUploading} />
      <UserAvatar size="xl" onPress={pickAndUploadImage} />
    </Box>
  );
}

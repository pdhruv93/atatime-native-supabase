import { useChangeProfileImage } from "./useChangeProfileImage";
import { UserAvatar } from "../UserAvatar";

export function ProfileImage() {
  const { pickAndUploadImage } = useChangeProfileImage();

  return <UserAvatar size="xl" onPress={pickAndUploadImage} />;
}

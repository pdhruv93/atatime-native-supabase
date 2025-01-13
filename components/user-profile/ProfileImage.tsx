import { useChangeProfileImage } from "./useChangeProfileImage";
import { UserAvatar } from "./UserAvatar";

export function ProfileImage() {
  const { pickImage } = useChangeProfileImage();

  return <UserAvatar size="xl" onPress={pickImage} />;
}

import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { type User } from "@/store/AuthStore";
import { getPublicUrl } from "@/utils/getPublicUrl";

interface UserAvatarProps {
  size?: "md" | "sm" | "lg" | "xl" | "2xl" | "xs" | undefined;
  userName: User["display_name"] | undefined;
  fileName: User["profile_picture"] | undefined;
}

export function UserAvatar({
  size = "md",
  userName,
  fileName,
}: UserAvatarProps) {
  return (
    <Avatar size={size}>
      <AvatarFallbackText>{userName}</AvatarFallbackText>
      <AvatarImage
        source={{
          uri: getPublicUrl(fileName),
        }}
      />
    </Avatar>
  );
}

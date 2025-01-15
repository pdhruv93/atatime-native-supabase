import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { useAuthContext } from "@/context/AuthContext";
import { getPublicUrl } from "@/utils/getPublicUrl";
import { Pressable } from "react-native";

interface UserAvatarProps {
  size?: "md" | "sm" | "lg" | "xl" | "2xl" | "xs" | undefined;
  onPress?: () => void;
}

export function UserAvatar({ size = "md", onPress }: UserAvatarProps) {
  const { loggedInUser } = useAuthContext();
  const profileImageUrl = getPublicUrl(loggedInUser?.profile_picture);

  return (
    <Pressable onPress={onPress}>
      <Avatar size={size}>
        <AvatarFallbackText>{loggedInUser?.display_name}</AvatarFallbackText>
        <AvatarImage
          source={{
            uri: profileImageUrl,
          }}
        />
      </Avatar>
    </Pressable>
  );
}

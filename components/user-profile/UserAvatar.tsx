import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { useAuthStore } from "@/store/AuthStore";
import { getPublicUrl } from "@/utils/getPublicUrl";
import { Pressable } from "react-native";
import { useShallow } from "zustand/react/shallow";

interface UserAvatarProps {
  size?: "md" | "sm" | "lg" | "xl" | "2xl" | "xs" | undefined;
  onPress?: () => void;
}

export function UserAvatar({ size = "md", onPress }: UserAvatarProps) {
  const [user] = useAuthStore(useShallow((s) => [s.loggedInUser]));
  const profileImageUrl =
    user?.profile_picture_local_path || getPublicUrl(user?.profile_picture);

  return (
    <Pressable onPress={onPress}>
      <Avatar size={size}>
        <AvatarFallbackText>{user?.display_name}</AvatarFallbackText>
        <AvatarImage
          source={{
            uri: profileImageUrl,
          }}
        />
      </Avatar>
    </Pressable>
  );
}

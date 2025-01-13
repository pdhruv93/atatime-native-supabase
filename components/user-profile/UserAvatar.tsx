import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { useAuthContext } from "@/context/AuthContext";
import { Pressable } from "react-native";

interface UserAvatarProps {
  size?: "md" | "sm" | "lg" | "xl" | "2xl" | "xs" | undefined;
  onPress?: () => void;
}

export function UserAvatar({ size = "md", onPress }: UserAvatarProps) {
  const { loggedInUser } = useAuthContext();

  console.log(loggedInUser?.display_name, loggedInUser?.profile_url);

  return (
    <Pressable onPress={onPress}>
      <Avatar size={size}>
        <AvatarFallbackText>{loggedInUser?.display_name}</AvatarFallbackText>
        <AvatarImage
          source={{
            uri: loggedInUser?.profile_url ?? undefined,
          }}
        />
        <AvatarBadge />
      </Avatar>
    </Pressable>
  );
}

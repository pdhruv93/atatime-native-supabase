import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { router } from "expo-router";
import { Pressable } from "react-native";

export function UserAvatar() {
  const { loggedInUser } = useLoggedInUser();

  return (
    <Pressable onPress={() => router.push("/profile")}>
      <Avatar size="md">
        <AvatarFallbackText>Dhruv Pandey</AvatarFallbackText>
        <AvatarImage
          source={{
            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          }}
        />
        <AvatarBadge />
      </Avatar>
    </Pressable>
  );
}

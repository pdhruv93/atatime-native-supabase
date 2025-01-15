import { Text } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { UserAvatar } from "@/components/user-profile";
import { Box } from "@/components/ui/box";
import { router } from "expo-router";
import { useAuthStore } from "@/store/AuthStore";
import { useShallow } from "zustand/react/shallow";

export default function Home() {
  const [signOut] = useAuthStore(useShallow((s) => [s.signOut]));

  return (
    <VStack space="4xl" className="h-full bg-white">
      <Box className="items-end">
        <UserAvatar onPress={() => router.push("/profile")} />
      </Box>

      <Text>Main body of app</Text>
    </VStack>
  );
}

import { Text } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { UserAvatar } from "@/components/user-profile";
import { Box } from "@/components/ui/box";
import { router } from "expo-router";
import { useAuthContext } from "@/context/AuthContext";

export default function Home() {
  const { signOut } = useAuthContext();

  return (
    <VStack space="4xl" className="h-full bg-white">
      <Box className="items-end">
        <UserAvatar onPress={() => router.push("/profile")} />
      </Box>

      <Text>Main body of app</Text>

      <Button size="xl" variant="solid" action="primary" onPress={signOut}>
        <ButtonText>Signout</ButtonText>
      </Button>
    </VStack>
  );
}

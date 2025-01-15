import { Text } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { UserAvatar } from "@/components/user-profile";
import { Box } from "@/components/ui/box";
import { router } from "expo-router";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";

export default function Home() {
  return (
    <VStack space="4xl" className="h-full bg-white">
      <HStack className="w-full justify-between items-center">
        <Heading size="2xl">@@time</Heading>

        <Box className="items-end">
          <UserAvatar onPress={() => router.push("/profile")} />
        </Box>
      </HStack>

      <Text>Main body of app</Text>
    </VStack>
  );
}

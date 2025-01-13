import { Button, ButtonIcon } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { ChevronsLeftIcon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import {
  ProfileImage,
  BasicProfileForm,
  UserLocation,
} from "@/components/user-profile";
import { useAuthContext } from "@/context/AuthContext";
import { router } from "expo-router";
import { ScrollView } from "react-native";

export default function Profile() {
  const { loggedInUser: user } = useAuthContext();

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack space="4xl" className="h-full bg-white">
        <VStack space="xs" className="items-center">
          <Button
            size="lg"
            className="rounded-full p-3.5 self-start"
            variant="outline"
            onPress={() => router.push("/home")}
          >
            <ButtonIcon as={ChevronsLeftIcon} />
          </Button>

          <ProfileImage />
          <Heading size="2xl">{user?.display_name || "No Name yet"}</Heading>
          <Heading size="md">{user?.email}</Heading>
          <UserLocation />
        </VStack>

        <VStack space="md">
          <Heading size="xl">Basic Profile</Heading>
          <BasicProfileForm />
        </VStack>
      </VStack>
    </ScrollView>
  );
}

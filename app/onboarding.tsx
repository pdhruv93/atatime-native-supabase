import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonIcon } from "@/components/ui/button";
import { ChevronsRightIcon } from "@/components/ui/icon";
import { router } from "expo-router";

export default function Onboarding() {
  return (
    <Center className="bg-black h-full">
      <VStack space="4xl" className="w-full h-full justify-center">
        <VStack space="md">
          <Heading size="4xl">@@time</Heading>

          <Heading size="md">
            type what you are doing and connect with people doing the same
            activity as you at that time.
          </Heading>

          <Heading size="md">
            easy signup with magic link on your email. no need to remember
            passwords.
          </Heading>
        </VStack>

        <Button
          size="lg"
          className="rounded-full p-3.5 self-center"
          variant="outline"
          onPress={() => router.replace("/sign-up")}
        >
          <ButtonIcon as={ChevronsRightIcon} />
        </Button>
      </VStack>
    </Center>
  );
}

import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { router } from "expo-router";

export default function NotFoundScreen() {
  return (
    <Center className="bg-black h-full">
      <VStack space="4xl" className="w-full h-full justify-center">
        <VStack space="md">
          <Heading size="4xl">@@time</Heading>
          <Heading size="lg">oops! you ended up to a missing route.</Heading>
        </VStack>

        <Button
          size="xl"
          variant="solid"
          onPress={() => router.replace("/home")}
        >
          <ButtonText>Go back home</ButtonText>
        </Button>
      </VStack>
    </Center>
  );
}

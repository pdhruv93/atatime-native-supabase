import { ActivityForm } from "@/components/activity-creator";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { ChevronsLeftIcon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { router } from "expo-router";

export default function CreateActivity() {
  return (
    <VStack space="xl" className="h-full bg-black">
      <Button
        size="lg"
        className="rounded-full p-3.5 self-start"
        variant="outline"
        onPress={() => router.replace("/home")}
      >
        <ButtonIcon as={ChevronsLeftIcon} />
      </Button>

      <Heading size="2xl">Start typing your activity</Heading>
      <ActivityForm />
    </VStack>
  );
}

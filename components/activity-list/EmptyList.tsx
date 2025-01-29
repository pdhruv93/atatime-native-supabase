import { useUtilityStore } from "@/store/UtilityStore";
import { useShallow } from "zustand/react/shallow";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { router } from "expo-router";

export function EmptyList() {
  const [typedActivity, setTypedActivity] = useUtilityStore(
    useShallow((s) => [s.typedActivity, s.setTypedActivity])
  );

  const resetView = () => {
    setTypedActivity(null);
    router.replace("/home");
  };

  return (
    <VStack space="4xl" className="w-full h-full justify-center">
      <Heading size="3xl">No one found for</Heading>
      <Heading size="4xl">
        {typedActivity} {":("}
      </Heading>

      <Button size="lg" variant="outline" onPress={resetView}>
        <ButtonText>Take me home</ButtonText>
      </Button>
    </VStack>
  );
}

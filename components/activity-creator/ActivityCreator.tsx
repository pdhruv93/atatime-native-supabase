import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { AddIcon } from "@/components/ui/icon";
import { router } from "expo-router";

export function ActivityCreator() {
  return (
    <Fab
      size="lg"
      placement="bottom center"
      onPress={() => router.replace("/create-activity")}
    >
      <FabIcon as={AddIcon} />
      <FabLabel>Add activity</FabLabel>
    </Fab>
  );
}

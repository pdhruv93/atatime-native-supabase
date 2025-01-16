import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { AddIcon } from "@/components/ui/icon";
import { useShowToast } from "@/hooks/useShowToast";
import { useAuthStore } from "@/store/AuthStore";
import { router } from "expo-router";
import { useShallow } from "zustand/react/shallow";

export function ActivityCreator() {
  const { generateToast } = useShowToast();
  const [user] = useAuthStore(useShallow((s) => [s.loggedInUser]));

  const onCreateClick = () => {
    if (user?.is_complete) {
      router.replace("/create-activity");
      return;
    }

    generateToast(
      "profile-not-complete",
      "info",
      "Please complete your profile to add activity"
    );
  };

  return (
    <Fab size="lg" placement="bottom center" onPress={onCreateClick}>
      <FabIcon as={AddIcon} />
      <FabLabel>Add activity</FabLabel>
    </Fab>
  );
}

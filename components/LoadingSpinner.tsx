import { Modal, ModalBackdrop, ModalContent } from "@/components/ui/modal";
import { Spinner } from "@/components/ui/spinner";
import { Center } from "@/components/ui/center";
import { useUtilityStore } from "@/store/UtilityStore";
import { useShallow } from "zustand/react/shallow";

export function LoadingSpinner() {
  const [isLoading] = useUtilityStore(useShallow((s) => [s.isLoading]));

  return (
    <Modal isOpen={isLoading} size="full">
      <ModalBackdrop />
      <Center>
        <ModalContent className="bg-transparent border-0">
          <Spinner size="large" color="black" />
        </ModalContent>
      </Center>
    </Modal>
  );
}

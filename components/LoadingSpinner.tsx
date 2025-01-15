import { Modal, ModalBackdrop, ModalContent } from "@/components/ui/modal";
import { Spinner } from "@/components/ui/spinner";
import { Center } from "@/components/ui/center";

interface LoadingSpinnerProps {
  isVisible?: boolean;
}

export function LoadingSpinner({ isVisible = false }: LoadingSpinnerProps) {
  return (
    <Modal isOpen={isVisible} size="full">
      <ModalBackdrop />
      <Center>
        <ModalContent className="bg-transparent border-0">
          <Spinner size="large" color="black" />
        </ModalContent>
      </Center>
    </Modal>
  );
}

import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { AddIcon } from "@/components/ui/icon";
import { ActivityForm } from "./ActivityForm";

export function ActivityCreator() {
  return (
    <Center className="h-[300px]">
      <Fab
        size="lg"
        placement="bottom center"
        onPress={() => setShowModal(true)}
      >
        <FabIcon as={AddIcon} />
        <FabLabel>Add activity</FabLabel>
      </Fab>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        size="sm"
      >
        <ModalBackdrop />

        <ModalContent>
          <ModalHeader>
            <Heading size="md" className="text-typography-950">
              Invite your team
            </Heading>
            <ModalCloseButton>
              <Icon
                as={CloseIcon}
                size="md"
                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
              />
            </ModalCloseButton>
          </ModalHeader>

          <ModalBody>
            <ActivityForm />
          </ModalBody>

          <ModalFooter>
            <Button
              variant="outline"
              action="secondary"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonText>Explore</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}

import { Input, InputField } from "@/components/ui/input";

export function ActivityCreator() {
  return (
    <Input
      variant="outline"
      size="xl"
      isDisabled={false}
      isInvalid={false}
      isReadOnly={false}
    >
      <InputField placeholder="Type your activity..." />
    </Input>
  );
}

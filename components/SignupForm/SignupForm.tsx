import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Controller } from "react-hook-form";
import { useSignup } from "./useSignup";

export function SignupForm() {
  const { control, errors, handleSubmit, onSubmit } = useSignup();

  return (
    <VStack>
      <Controller
        control={control}
        render={({ field }) => (
          <Input {...field} isInvalid={!!errors.name}>
            <InputField placeholder="Your name" />
          </Input>
        )}
        name="name"
        rules={{ required: "You must enter your name" }}
      />
      {errors.name && <Text>{errors.name.message}</Text>}

      <Button
        size="md"
        variant="solid"
        action="primary"
        onPress={handleSubmit(onSubmit)}
      >
        <ButtonText>Singup</ButtonText>
      </Button>
    </VStack>
  );
}

import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { useSignup } from "./useSignup";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
} from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";

export function SignupForm() {
  const { errors, handleSubmit, onFormSubmit, register } = useSignup();

  return (
    <VStack space="lg" className="w-full">
      <FormControl isInvalid={!!errors.displayName}>
        <Input
          id="displayName"
          size="xl"
          {...register("displayName")}
          isInvalid={!!errors.displayName}
        >
          <InputField placeholder="Your name" />
        </Input>

        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />

          <FormControlErrorText>
            {errors.displayName && errors.displayName.message}
          </FormControlErrorText>
        </FormControlError>
      </FormControl>

      <FormControl isInvalid={!!errors.email}>
        <Input size="xl" {...register("email")} isInvalid={!!errors.email}>
          <InputField placeholder="Email" />
        </Input>

        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />

          <FormControlErrorText>
            {errors.email && errors.email.message}
          </FormControlErrorText>
        </FormControlError>
      </FormControl>

      <Button
        size="xl"
        variant="solid"
        action="primary"
        onPress={handleSubmit(onFormSubmit)}
      >
        <ButtonText>Singup</ButtonText>
      </Button>
    </VStack>
  );
}

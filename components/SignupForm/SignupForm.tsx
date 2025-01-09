import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useSignup } from "./useSignup";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
} from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Controller } from "react-hook-form";

export function SignupForm() {
  const { errors, handleSubmit, onFormSubmit, register, control } = useSignup();

  return (
    <VStack space="lg" className="w-full">
      <Controller
        control={control}
        name="displayName"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl isInvalid={!!errors.displayName}>
            <Input size="xl" isInvalid={!!errors.displayName}>
              <InputField
                placeholder="Your name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </Input>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />

              <FormControlErrorText>
                {errors.displayName && errors.displayName.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl isInvalid={!!errors.email}>
            <Input size="xl" isInvalid={!!errors.email}>
              <InputField
                placeholder="Your email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </Input>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />

              <FormControlErrorText>
                {errors.email && errors.email.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
        )}
      />

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

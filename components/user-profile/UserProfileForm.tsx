import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { useProfile } from "./useProfile";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
} from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Controller } from "react-hook-form";

export function UserProfileForm() {
  const { errors, handleSubmit, onFormSubmit, control } = useProfile();

  return (
    <VStack space="lg" className="w-full">
      <Controller
        control={control}
        name="displayName"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl isInvalid={!!errors.displayName}>
            <Input size="xl" isInvalid={!!errors.displayName}>
              <InputField
                placeholder="Your Name"
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
        name="age"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl isInvalid={!!errors.age}>
            <Input size="xl" isInvalid={!!errors.age}>
              <InputField
                placeholder="Your Age"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value?.toString()}
              />
            </Input>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />

              <FormControlErrorText>
                {errors.age && errors.age.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
        )}
      />

      <Controller
        control={control}
        name="bio"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl isInvalid={!!errors.bio}>
            <Textarea size="xl" isInvalid={!!errors.bio}>
              <TextareaInput
                placeholder="Let people know you"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </Textarea>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />

              <FormControlErrorText>
                {errors.bio && errors.bio.message}
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
        <ButtonText>Update</ButtonText>
      </Button>
    </VStack>
  );
}

import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { useBasicProfile } from "./useBasicProfile";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Controller } from "react-hook-form";

export function BasicProfileForm() {
  const { errors, handleSubmit, onFormSubmit, control } = useBasicProfile();

  return (
    <VStack space="xl" className="w-full">
      <Controller
        control={control}
        name="displayName"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl isInvalid={!!errors.displayName}>
            <FormControlLabel>
              <FormControlLabelText>Display name</FormControlLabelText>
            </FormControlLabel>

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
            <FormControlLabel>
              <FormControlLabelText>Age</FormControlLabelText>
            </FormControlLabel>

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
            <FormControlLabel>
              <FormControlLabelText>Bio</FormControlLabelText>
            </FormControlLabel>

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

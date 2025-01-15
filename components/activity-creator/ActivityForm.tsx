import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { useActivityCreator } from "./useActivityCreator";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
} from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Controller } from "react-hook-form";

export function ActivityForm() {
  const { errors, handleSubmit, onFormSubmit, control } = useActivityCreator();

  return (
    <VStack space="lg" className="w-full">
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl isInvalid={!!errors.name}>
            <Input size="xl" isInvalid={!!errors.name}>
              <InputField
                placeholder="what are you doing? i'm"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </Input>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />

              <FormControlErrorText>
                {errors.name && errors.name.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl isInvalid={!!errors.description}>
            <Textarea size="xl" isInvalid={!!errors.description}>
              <TextareaInput
                placeholder="more about this activity. this is optional :)"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </Textarea>

            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />

              <FormControlErrorText>
                {errors.description && errors.description.message}
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

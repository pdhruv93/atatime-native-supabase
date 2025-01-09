import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputs, formSchema } from "./formSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export function useSignup() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: "",
      email: "",
    },
  });

  const onFormSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    // send data for signup
  };

  return { register, errors, handleSubmit, onFormSubmit, control };
}

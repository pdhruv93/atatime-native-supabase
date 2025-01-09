import { useForm } from "react-hook-form";

export function useSignup() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
  };

  return { control, errors, handleSubmit, onSubmit };
}

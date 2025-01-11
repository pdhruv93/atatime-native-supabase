import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputs, formSchema } from "./formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { makeRedirectUri } from "expo-auth-session";
import { supabase } from "@/utils/supabase";
import { useShowToast } from "@/hooks/useShowToast";

export function useSignup() {
  const { generateToast } = useShowToast();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    const redirectTo = makeRedirectUri();

    const { error } = await supabase.auth.signInWithOtp({
      email: data.email,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    generateToast(
      "sign-up",
      error ? "error" : "success",
      error ? error.message : "Use the link sent to the email address"
    );
  };

  return { register, errors, handleSubmit, onFormSubmit, control };
}

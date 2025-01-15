import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputs, formSchema } from "./formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { makeRedirectUri } from "expo-auth-session";
import { supabase } from "@/utils/supabase";
import { useShowToast } from "@/hooks/useShowToast";
import { useShallow } from "zustand/react/shallow";
import { useUtilityStore } from "@/store/UtilityStore";

export function useSignup() {
  const { generateToast } = useShowToast();
  const [setIsLoading] = useUtilityStore(useShallow((s) => [s.setIsLoading]));
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
    setIsLoading(true);
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

    setIsLoading(false);
  };

  return { register, errors, handleSubmit, onFormSubmit, control };
}

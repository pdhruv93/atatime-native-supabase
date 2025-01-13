import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputs, formSchema } from "./formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { makeRedirectUri } from "expo-auth-session";
import { supabase } from "@/utils/supabase";
import { useShowToast } from "@/hooks/useShowToast";
import { useAuthContext } from "@/context/AuthContext";

export function useProfile() {
  const { generateToast } = useShowToast();
  const { loggedInUser: user } = useAuthContext();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: user?.display_name ?? undefined,
      bio: user?.bio ?? undefined,
      age: user?.age ?? undefined,
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
      "profile-update",
      error ? "error" : "success",
      error ? error.message : "Profile Updated"
    );
  };

  return { register, errors, handleSubmit, onFormSubmit, control };
}

import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputs, formSchema } from "./formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { makeRedirectUri } from "expo-auth-session";
import { supabase } from "@/utils/supabase";
import { useToast, Toast, ToastTitle } from "@/components/ui/toast";

export function useSignup() {
  const toast = useToast();

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

  const onFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    const redirectTo = makeRedirectUri();

    const { error } = await supabase.auth.signInWithOtp({
      email: "valid.email@supabase.io",
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    toast.show({
      id: "singup-toast",
      placement: "bottom",
      duration: 3000,
      render: ({ id }) => {
        return (
          <Toast
            action={error ? "error" : "success"}
            variant="solid"
            nativeID={id}
          >
            <ToastTitle>
              {error
                ? error?.message
                : "Use the link sent to the email address"}
            </ToastTitle>
          </Toast>
        );
      },
    });
  };

  return { register, errors, handleSubmit, onFormSubmit, control };
}

import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputs, formSchema } from "./formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/utils/supabase";
import { useShowToast } from "@/hooks/useShowToast";
import { useAuthContext } from "@/context/AuthContext";

export function useProfile() {
  const { generateToast } = useShowToast();
  const { loggedInUser: user, refetchUserProfile } = useAuthContext();
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
      whatsappNumber: user?.whatsapp_number ?? undefined,
      instagramHandle: user?.instagram_handle ?? undefined,
    },
  });

  const onFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    const isProfileComplete =
      !!data.displayName && (!!data.instagramHandle || !!data.whatsappNumber);

    const { error } = await supabase
      .from("user_profile")
      .update({
        display_name: data.displayName,
        age: data.age,
        bio: data.bio,
        whatsapp_number: data.whatsappNumber,
        instagram_handle: data.instagramHandle,
        is_complete: isProfileComplete,
      })
      .eq("user_id", user?.user_id);

    generateToast(
      "profile-update",
      error ? "error" : "success",
      error ? error.message : "Profile Updated"
    );

    refetchUserProfile();
  };

  return { register, errors, handleSubmit, onFormSubmit, control };
}

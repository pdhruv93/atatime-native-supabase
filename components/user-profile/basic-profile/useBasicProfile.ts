import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputs, formSchema } from "./formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/store/AuthStore";
import { useUpdateUserProfile } from "@/hooks/useUpdateUserProfile";

export function useBasicProfile() {
  const { updateProfileToSupabase } = useUpdateUserProfile();
  const [user] = useAuthStore((s) => [s.loggedInUser]);
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
    updateProfileToSupabase({
      display_name: data.displayName,
      age: data.age,
      bio: data.bio,
    });
  };

  return { register, errors, handleSubmit, onFormSubmit, control };
}

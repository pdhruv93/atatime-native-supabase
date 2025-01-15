import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputs, formSchema } from "./formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/store/AuthStore";
import { supabase } from "@/utils/supabase";
import { useShowToast } from "@/hooks/useShowToast";
import { useUtilityStore } from "@/store/UtilityStore";
import { useShallow } from "zustand/react/shallow";
import { useState } from "react";

export function useActivityCreator() {
  const { generateToast } = useShowToast();
  const [showModal, setShowModal] = useState(false);

  const [user] = useAuthStore(useShallow((s) => [s.loggedInUser]));
  const [setIsLoading] = useUtilityStore(useShallow((s) => [s.setIsLoading]));

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (!user) {
      return;
    }

    console.log("Uploading User profile to Supabase storage...");
    setIsLoading(true);

    const { error } = await supabase.from("activities").insert({
      created_by: user.user_id,
      name: data.name,
      description: data.description,
    });

    if (error) {
      generateToast("activity-create", "error", error.message);
      return;
    }

    generateToast("activity-create", "success", "Profile Updated");
    setIsLoading(false);
  };

  return {
    register,
    errors,
    handleSubmit,
    onFormSubmit,
    control,
    showModal,
    setShowModal,
  };
}

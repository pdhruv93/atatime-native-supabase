import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputs, formSchema } from "./formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/store/AuthStore";
import { supabase } from "@/utils/supabase";
import { useShowToast } from "@/hooks/useShowToast";
import { useUtilityStore } from "@/store/UtilityStore";
import { useShallow } from "zustand/react/shallow";
import { router } from "expo-router";
import moment from "moment";

export function useActivityCreator() {
  const { generateToast } = useShowToast();
  const [user] = useAuthStore(useShallow((s) => [s.loggedInUser]));
  const [setIsLoading, setTypedActivity] = useUtilityStore(
    useShallow((s) => [s.setIsLoading, s.setTypedActivity])
  );

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
      visibleFor: 3,
    },
  });

  const onFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (!user) {
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.from("activities").insert({
      created_by: user.user_id,
      name: data.name,
      description: data.description,
      visible_until: moment().add(data.visibleFor, "days").format(),
    });

    if (error) {
      generateToast("activity-create", "error", error.message);
      setIsLoading(false);
      return;
    }

    generateToast("activity-create", "success", "Profile Updated");
    setTypedActivity(data.name);
    setIsLoading(false);
    router.replace("/home");
  };

  return {
    register,
    errors,
    handleSubmit,
    onFormSubmit,
    control,
  };
}

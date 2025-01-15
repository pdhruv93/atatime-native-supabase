import { useEffect, useState } from "react";
import { type Activity } from "./types";
import { useUtilityStore } from "@/store/UtilityStore";
import { useShallow } from "zustand/react/shallow";
import { supabase } from "@/utils/supabase";
import { useShowToast } from "@/hooks/useShowToast";

export function useActivityList() {
  const { generateToast } = useShowToast();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [typedActivity, setIsLoading] = useUtilityStore(
    useShallow((s) => [s.typedActivity, s.setIsLoading])
  );

  useEffect(() => {
    const fetchActivities = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from("activities").select();

      if (error) {
        generateToast("activities-fetch", "error", error.message);
        setIsLoading(false);
        return [];
      }

      setActivities(data);
      setIsLoading(false);
    };

    fetchActivities();
  }, [typedActivity]);

  return { activities };
}

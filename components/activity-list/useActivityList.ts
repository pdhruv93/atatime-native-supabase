import { useEffect, useState } from "react";
import { type ActivityWithUserDetails } from "./types";
import { useUtilityStore } from "@/store/UtilityStore";
import { useShallow } from "zustand/react/shallow";
import { supabase } from "@/utils/supabase";
import { useShowToast } from "@/hooks/useShowToast";
import { useAuthStore } from "@/store/AuthStore";

export function useActivityList() {
  const { generateToast } = useShowToast();
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [similarActivities, setSimilarActivities] = useState<
    ActivityWithUserDetails[]
  >([]);
  const [selectedActivity, setSelectedActivity] =
    useState<ActivityWithUserDetails | null>(null);

  const [user] = useAuthStore(useShallow((s) => [s.loggedInUser]));
  const [typedActivity, setIsLoading] = useUtilityStore(
    useShallow((s) => [s.typedActivity, s.setIsLoading])
  );

  useEffect(() => {
    const fetchActivities = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.rpc("get_activities", {
        logged_in_user_id: user?.user_id,
        search_activity_text: typedActivity ?? "",
        base_location: user?.location?.toString() ?? null,
      });

      if (error) {
        generateToast("activities-fetch", "error", error.message);
        setIsLoading(false);
        return [];
      }

      setSimilarActivities(data);
      setIsLoading(false);
    };

    fetchActivities();
  }, [typedActivity]);

  const openUserDetailsForActivity = (
    selectedActivity: ActivityWithUserDetails
  ) => {
    setSelectedActivity(selectedActivity);
    setShowUserDetails(true);
  };

  const closeUserDetails = () => {
    setSelectedActivity(null);
    setShowUserDetails(false);
  };

  return {
    similarActivities,
    selectedActivity,
    openUserDetailsForActivity,
    closeUserDetails,
  };
}

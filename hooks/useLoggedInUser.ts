import { supabase } from "@/utils/supabase";
import { type User, type QueryData } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import { useShowToast } from "./useShowToast";

export function useLoggedInUser() {
  const { generateToast } = useShowToast();
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [user, setUser] = useState<QueryData<any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getLoggedInUser = useCallback(async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      generateToast("user-fetch", "error", error.message);
      setLoggedInUser(null);
      return;
    }

    const user = data.session?.user;
    setLoggedInUser(user ? user : null);
  }, []);

  const getUserProfileData = useCallback(async () => {
    if (loggedInUser) {
      const { data: userProfileData, error } = await supabase
        .from("user_profile")
        .select()
        .eq("user_id", loggedInUser.id);

      if (error) {
        generateToast("user-fetch", "error", error.message);
        setUser(null);
        return;
      }

      setUser(userProfileData);
    }
  }, [loggedInUser?.id]);

  useEffect(() => {
    getLoggedInUser();
  }, [getLoggedInUser]);

  useEffect(() => {
    getUserProfileData().finally(() => {
      setIsLoading(false);
    });
  }, [getUserProfileData]);

  return {
    isLoading,
    loggedInUser: user,
    getUserProfileData,
    signOut: () => supabase.auth.signOut(),
  };
}

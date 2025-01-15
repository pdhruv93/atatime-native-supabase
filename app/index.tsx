import { useShowToast } from "@/hooks/useShowToast";
import { useEffect } from "react";
import * as Linking from "expo-linking";
import { useAuthStore } from "@/store/AuthStore";
import { useUtilityStore } from "@/store/UtilityStore";
import { supabase } from "@/utils/supabase";
import { SplashScreen, router } from "expo-router";
import { createSessionFromUrl } from "@/utils/createSessionFromUrl";
import { useShallow } from "zustand/react/shallow";

export default function App() {
  const url = Linking.useURL();
  const { generateToast } = useShowToast();

  const [setIsLoading] = useUtilityStore(useShallow((s) => [s.setIsLoading]));
  const [updateUserProfileLocally] = useAuthStore(
    useShallow((s) => [s.updateUserProfileLocally])
  );

  const onErrorHandler = () => {
    updateUserProfileLocally(null);
    setIsLoading(false);
    SplashScreen.hideAsync();
    router.replace("/sign-up");
  };

  const getUserProfileData = async (userId: string) => {
    if (userId) {
      const { data: userProfileData, error } = await supabase
        .from("user_profile")
        .select()
        .eq("user_id", userId)
        .single();

      if (error) {
        generateToast("user-fetch", "error", error.message);
        onErrorHandler();
        return;
      }

      // User profile fetched, redirect to Home Screen
      updateUserProfileLocally(userProfileData);
      setIsLoading(false);
      SplashScreen.hideAsync();
      router.replace("/home");
    }
  };

  // Listen to Auth state changes
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        getUserProfileData(session.user.id);
      } else {
        onErrorHandler();
      }
    });
  }, []);

  // Create session from Magic Link URL
  useEffect(() => {
    if (url) {
      createSessionFromUrl(url)
        .then()
        .catch((error: string) => {
          generateToast("user-fetch", "error", error);
          onErrorHandler();
        });
    }
  }, [url]);

  // If user already has the session in local storage
  useEffect(() => {
    supabase.auth
      .getSession()
      .then((data) => {
        if (data.data.session) {
          getUserProfileData(data.data.session.user.id);
        } else {
          onErrorHandler();
        }
      })
      .catch(() => {
        onErrorHandler();
      });
  }, []);

  return null;
}

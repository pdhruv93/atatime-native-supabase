import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { type AuthContextType } from "./types";
import { type User } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";
import { router, SplashScreen } from "expo-router";
import { useShowToast } from "@/hooks/useShowToast";
import * as Linking from "expo-linking";
import { createSessionFromUrl } from "./utils";
import { User as LoggedInUserType } from "./types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultUserProfile: LoggedInUserType = {
  age: null,
  bio: null,
  created_at: "",
  display_name: null,
  email: null,
  instagram_handle: null,
  is_complete: null,
  location: null,
  location_name: null,
  preferences: null,
  profile_url: null,
  user_id: "",
  whatsapp_number: null,
};

export function AuthContextProvider({ children }: PropsWithChildren<unknown>) {
  const url = Linking.useURL();
  const { generateToast } = useShowToast();
  const [isLoading, setIsLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<LoggedInUserType | null>(null);
  const isProfileComplete =
    !!userProfile?.display_name &&
    (!!userProfile.instagram_handle || !!userProfile.whatsapp_number);

  const onErrorHandler = () => {
    setLoggedInUser(null);
    setIsLoading(false);
    SplashScreen.hideAsync();
    router.replace("/sign-up");
  };

  const getUserProfileData = async () => {
    if (loggedInUser?.id) {
      const { data: userProfileData, error } = await supabase
        .from("user_profile")
        .select()
        .eq("user_id", loggedInUser?.id)
        .single();

      if (error) {
        generateToast("user-fetch", "error", error.message);
        onErrorHandler();
        return;
      }

      // User profile fetched, redirect to Home Screen
      setUserProfile(userProfileData);
      setIsLoading(false);
      SplashScreen.hideAsync();
      router.replace("/home");
    }
  };

  const updateUserProfileLocally = (newProfile: Partial<LoggedInUserType>) => {
    setUserProfile((oldProfile) => ({
      ...defaultUserProfile,
      ...oldProfile,
      ...newProfile,
    }));
  };

  // Listen to Auth state changes
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        setLoggedInUser(session.user);
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
          setLoggedInUser(data.data.session.user);
        } else {
          onErrorHandler();
        }
      })
      .catch(() => {
        onErrorHandler();
      });
  }, []);

  // get user profile data whenever the user changes
  useEffect(() => {
    getUserProfileData();
  }, [loggedInUser?.id]);

  return (
    <AuthContext.Provider
      value={{
        isProfileComplete,
        loggedInUserId: loggedInUser?.id,
        isLoading,
        loggedInUser: userProfile,
        refetchUserProfile: getUserProfileData,
        updateUserProfileLocally,
        signOut: () => supabase.auth.signOut(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
}

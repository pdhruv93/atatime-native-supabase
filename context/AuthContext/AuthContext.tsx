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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children }: PropsWithChildren<unknown>) {
  const url = Linking.useURL();
  const { generateToast } = useShowToast();
  const [isLoading, setIsLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);

  const getUserProfileData = async () => {
    if (loggedInUser?.id) {
      const { data: userProfileData, error } = await supabase
        .from("user_profile")
        .select()
        .eq("user_id", loggedInUser?.id);

      if (error) {
        generateToast("user-fetch", "error", error.message);
        setLoggedInUser(null);
        setIsLoading(false);
        SplashScreen.hideAsync();
        router.replace("/sign-up");
        return;
      }

      // User profile fetched, redirect to Home Screen
      setUserProfile(userProfileData);
      setIsLoading(false);
      SplashScreen.hideAsync();
      router.replace("/home");
    }
  };

  // Listen to Auth state changes
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        setLoggedInUser(session.user);
      } else {
        setLoggedInUser(null);
        setIsLoading(false);
        SplashScreen.hideAsync();
        router.replace("/sign-up");
      }
    });
  }, []);

  // Create session from Magic Link URL
  useEffect(() => {
    if (url) {
      createSessionFromUrl(url)
        .then()
        .catch((error: string) => {
          generateToast("session", "error", error);
          setLoggedInUser(null);
          setIsLoading(false);
          SplashScreen.hideAsync();
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
          setLoggedInUser(null);
          setIsLoading(false);
          SplashScreen.hideAsync();
          router.replace("/sign-up");
        }
      })
      .catch(() => {
        setLoggedInUser(null);
        setIsLoading(false);
        SplashScreen.hideAsync();
        router.replace("/sign-up");
      });
  }, []);

  // get user profile data whenever the user changes
  useEffect(() => {
    getUserProfileData();
  }, [loggedInUser?.id]);

  return (
    <AuthContext.Provider
      value={{
        loggedInUserId: loggedInUser?.id,
        isLoading,
        loggedInUser: userProfile,
        refetchUserProfile: getUserProfileData,
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

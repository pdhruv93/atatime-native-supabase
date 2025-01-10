import { router, SplashScreen } from "expo-router";
import { supabase } from "@/utils/supabase";
import * as Linking from "expo-linking";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import { useShowToast } from "@/hooks/useShowToast";
import { useEffect } from "react";

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);
  if (errorCode) {
    throw errorCode;
  }

  const { token } = params;
  if (!token) return;

  const { error } = await supabase.auth.verifyOtp({
    token_hash: token,
    type: "email",
  });

  if (error) {
    throw error.message;
  }
};

export default function App() {
  const { generateToast } = useShowToast();
  const url = Linking.useURL();

  useEffect(() => {
    if (url) {
      createSessionFromUrl(url)
        .then()
        .catch((error: string) => {
          generateToast("session", "error", error);
        });
    }
  }, []);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then((data) => {
        if (data.data.session) {
          router.replace("/home");
          SplashScreen.hideAsync();
        }
      })
      .catch(() => {
        router.replace("/sign-up");
      });
  }, []);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          router.replace("/home");
          SplashScreen.hideAsync();
        } else {
          router.replace("/sign-up");
        }
      }
    );

    return () => authListener.subscription?.unsubscribe();
  }, []);
}

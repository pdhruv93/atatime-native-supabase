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

  const { access_token, refresh_token } = params;

  console.log("::URL", url, access_token, refresh_token);
  if (!access_token) return;

  const { error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
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
  }, [url]);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then((data) => {
        if (data.data.session) {
          router.replace("/home");
        } else {
          router.replace("/sign-up");
        }
      })
      .catch(() => {
        router.replace("/sign-up");
      })
      .finally(() => SplashScreen.hideAsync());
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

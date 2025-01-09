import { router } from "expo-router";
import { supabase } from "@/utils/supabase";
import * as Linking from "expo-linking";
import * as QueryParams from "expo-auth-session/build/QueryParams";

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);
  if (errorCode) throw new Error(errorCode);

  const { token } = params;
  if (!token) return;

  const { error } = await supabase.auth.verifyOtp({
    token_hash: token,
    type: "email",
  });
  if (error) throw error;
};

export default async function App() {
  const url = Linking.useURL();

  if (url) {
    createSessionFromUrl(url);
  }

  const { data, error } = await supabase.auth.getSession();

  console.log(":::USer data", data);

  if (error) {
    router.replace("/sign-up");
    return null;
  }

  router.replace("/home");
  return null;
}

import { supabase } from "@/utils/supabase";
import * as QueryParams from "expo-auth-session/build/QueryParams";

export async function createSessionFromUrl(url: string) {
  if (url.indexOf("error") > -1) {
    throw "Error occured while signing in";
  }

  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) {
    throw errorCode;
  }

  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });

  if (error) {
    throw error.message;
  }
}

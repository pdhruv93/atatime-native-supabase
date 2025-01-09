import * as SecureStore from "expo-secure-store";
import { LOGGED_IN_USER_EMAIL } from "@/constants";
import { router } from "expo-router";

export default async function App() {
  let loggedInUserEmailId =
    await SecureStore.getItemAsync(LOGGED_IN_USER_EMAIL);

  if (!loggedInUserEmailId) {
    router.replace("/sign-up");
    return null;
  }

  router.replace("/home");
  return null;
}

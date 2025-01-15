import { create } from "zustand";
import { type AuthStoreProps, type AuthStore } from "./types";
import { supabase } from "@/utils/supabase";
import { router } from "expo-router";

const defaultProps: AuthStoreProps = {
  loggedInUser: null,
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...defaultProps,
  updateUserProfileLocally: (newProfile) => {
    set((currentProfile) => ({ ...currentProfile, ...newProfile }));
    router.push("/home");
  },
  signOut: () => supabase.auth.signOut(),
}));

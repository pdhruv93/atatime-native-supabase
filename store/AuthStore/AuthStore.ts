import { create } from "zustand";
import { type AuthStoreProps, type AuthStore } from "./types";
import { supabase } from "@/utils/supabase";

import { defaultUserProfile } from "./defaultUser";

const defaultProps: AuthStoreProps = {
  loggedInUser: null,
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  ...defaultProps,
  updateUserProfileLocally: (newProfile) =>
    set({
      loggedInUser: {
        ...defaultUserProfile,
        ...get().loggedInUser,
        ...newProfile,
      },
    }),
  signOut: () => supabase.auth.signOut(),
}));

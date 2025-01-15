import { Tables } from "@/database.types";

export type User = Tables<"user_profile">;

export interface AuthStoreProps {
  loggedInUser: User | null;
}

export type AuthStoreActions = {
  updateUserProfileLocally: (newProfile: Partial<User> | null) => void;
  signOut: () => void;
};

export type AuthStore = AuthStoreProps & AuthStoreActions;

import { Tables } from "@/database.types";

export type User = Tables<"user_profile">;

export interface AuthContextType {
  isLoading: boolean;
  isProfileComplete: boolean;
  loggedInUserId: string | undefined;
  loggedInUser: User | null;
  refetchUserProfile: () => void;
  updateUserProfileLocally: (newProfile: Partial<User>) => void;
  signOut: () => void;
}

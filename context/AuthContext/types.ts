import { Tables } from "@/database.types";

export type User = Tables<"user_profile">;

export interface AuthContextType {
  isLoading: boolean;
  loggedInUserId: string | undefined;
  loggedInUser: User | null;
  refetchUserProfile: () => void;
  signOut: () => void;
}

export interface AuthContextType {
  isLoading: boolean;
  loggedInUserId: string | undefined;
  loggedInUser: any | null;
  refetchUserProfile: () => void;
  signOut: () => void;
}

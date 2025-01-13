export interface AuthContextType {
  isLoading: boolean;
  loggedInUser: any | null;
  refetchUserProfile: () => void;
  signOut: () => void;
}

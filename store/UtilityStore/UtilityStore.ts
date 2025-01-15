import { create } from "zustand";

export interface UtilityStoreProps {
  isLoading: boolean;
  typedActivity: string | null;
}

type UtilityStoreActions = {
  setIsLoading: (isLoading: UtilityStoreProps["isLoading"]) => void;
  setTypedActivity: (typedActivity: UtilityStoreProps["typedActivity"]) => void;
};

type UtilityStore = UtilityStoreProps & UtilityStoreActions;

const defaultProps: UtilityStoreProps = {
  isLoading: true,
  typedActivity: null,
};

export const useUtilityStore = create<UtilityStore>((set) => ({
  ...defaultProps,
  setIsLoading: (isLoading) => set({ isLoading }),
  setTypedActivity: (typedActivity) => set({ typedActivity }),
}));

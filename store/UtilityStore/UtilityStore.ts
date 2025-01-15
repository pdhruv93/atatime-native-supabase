import { create } from "zustand";

export interface UtilityStoreProps {
  isLoading: boolean;
}

type UtilityStoreActions = {
  setIsLoading: (isLoading: UtilityStoreProps["isLoading"]) => void;
};

type UtilityStore = UtilityStoreProps & UtilityStoreActions;

const defaultProps: UtilityStoreProps = {
  isLoading: true,
};

export const useUtilityStore = create<UtilityStore>((set) => ({
  ...defaultProps,
  setIsLoading: (isLoading) => set({ isLoading }),
}));

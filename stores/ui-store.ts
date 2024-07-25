import { create } from "zustand";

export type UIStoreType = {
  isHidden: boolean;
  play: () => void;
  stop: () => void;
};

export const useUIStore = create((set) => ({
  isHidden: false,
  show: () => set({ isHidden: true }),
  hidden: () => set({ isHidden: false }),
}));

import { create } from "zustand";

export type UIStoreType = {
  isHidden: boolean;
  play: () => void;
  stop: () => void;
};

export const useUIStore = create((set) => ({
  isHidden: true,
  show: () => set({ isHidden: true }),
  hidden: () => set({ isHidden: false }),
}));

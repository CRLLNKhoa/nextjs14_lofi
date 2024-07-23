import { create } from "zustand";

export type TimeStoreType = {
  isOpen: boolean;
  play: () => void;
  removeAllBears: () => void;
};

export const useTimeStore = create((set) => ({
  isOpen: false,
  id: "PiXMzixDy8Y",
  play: () => set({ isOpen: true}),
  stop: () => set({ isOpen: false}),
}));

import { create } from "zustand";

export type YTBStoreType = {
  isOpen: boolean;
  id: string;
  play: () => void;
  removeAllBears: () => void;
};

export const useYTBStore = create((set) => ({
  isOpen: false,
  id: "PiXMzixDy8Y",
  play: (id: string) =>
    set((state: YTBStoreType) => ({ isOpen: true, id: id })),
  stop: () => set({ isOpen: false}),
}));

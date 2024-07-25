import { create } from "zustand";


export const usePaperyStore = create((set) => ({
  isOpen: false,
  play: () => set({ isOpen: true}),
  stop: () => set({ isOpen: false}),
}));

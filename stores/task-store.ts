import { create } from "zustand";

export type TaskStoreType = {
  isOpen: boolean;
  play: () => void;
  stop: () => void;
};

export const useTaskStore = create((set) => ({
  isOpen: false,
  play: () => set({ isOpen: true}),
  stop: () => set({ isOpen: false}),
}));

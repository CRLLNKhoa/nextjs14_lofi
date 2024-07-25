import { TPapery } from "@/types/papery";
import { create } from "zustand";

export const useNoteStore = create((set) => ({
  notes: [],
  isOpen: false,
  getNotes: (data: TPapery[]) => set((state: any) => ({ notes: data })),
  addNote: (newNote: TPapery) =>
    set((state: any) => ({
      notes: [...state.notes, newNote],
    })),
  deleteNote: (id: string) =>
    set((state: any) => ({
      notes: state.notes.filter((note: TPapery) => note.id !== id),
    })),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

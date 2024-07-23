// stores/audioStore.ts
import {create} from 'zustand';

export interface AudioStoreState {
  audioRefs: any[];
  volumes: any[];
  setAudioRefs: (refs: any[]) => void;
  setVolumes: (volumes: any[]) => void;
  playAudio: (index: number) => void;
  pauseAudio: (index: number) => void;
  stopAudio: () => void;
  setVolume: (index: number, volume: number) => void;
}

const useAudioStore = create((set) => ({
  audioRefs: [],
  volumes: [],
  setAudioRefs: (refs: any[]) => set({ audioRefs: refs }),
  setVolumes: (volumes: any[]) => set({ volumes }),
  playAudio: (index: number) => set((state: { audioRefs: HTMLAudioElement[]; }) => {
    if (state.audioRefs[index]) {
      (state.audioRefs[index] as HTMLAudioElement).play();
    }
  }),
  pauseAudio: (index: number) => set((state: { audioRefs: HTMLAudioElement[]; }) => {
    if (state.audioRefs[index]) {
      (state.audioRefs[index] as HTMLAudioElement).pause();
    }
  }),
  stopAudio: () => set((state:any) => {
    if (Array.isArray(state.audioRefs)) {
      (state.audioRefs as HTMLAudioElement[]).forEach((audio: any) => {
        if (audio) {
          (audio as HTMLAudioElement).pause();
          (audio as HTMLAudioElement).currentTime = 0;
        }
      });
    }
  }),
  setVolume: (index: number, volume: number) => set((state: { audioRefs: HTMLAudioElement[]; volumes: number[]; }) => {
    if (state.audioRefs[index]) {
      (state.audioRefs[index] as HTMLAudioElement).volume = volume;
    }
    return {
      volumes: (state.volumes as number[]).map((v: any, i: number) => (i === index ? volume : v))
    };
  }),
}));

export default useAudioStore;

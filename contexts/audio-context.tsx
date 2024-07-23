// context/AudioContext.tsx
"use client"
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";

interface AudioContextType {
  audioRefs: any;
  playAudio: (index: number) => void;
  pauseAudio: (index: number) => void;
  stopAudio: () => void;
  setVolume: (index: number, volume: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const audioRefs = useRef<HTMLAudioElement[]>([]);
  const [volumes, setVolumes] = useState<number[]>([]);

  const playAudio = useCallback((index: number) => {
    if (audioRefs.current[index]) {
      audioRefs.current[index].play();
    }
  }, []);

  const pauseAudio = useCallback((index: number) => {
    if (audioRefs.current[index]) {
      audioRefs.current[index].pause();
    }
  }, []);

  const stopAudio = useCallback(() => {
    audioRefs.current.forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  }, []);

  const setVolume = useCallback((index: number, volume: number) => {
    if (audioRefs.current[index]) {
      audioRefs.current[index].volume = volume;
    }
    setVolumes((prevVolumes) =>
      prevVolumes.map((v, i) => (i === index ? volume : v))
    );
  }, []);

  return (
    <AudioContext.Provider
      value={{ audioRefs, playAudio, pauseAudio, stopAudio, setVolume }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

// components/AudioPlayer.tsx
import { useAudio } from "@/contexts/audio-context";
import React, { useRef, useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { IoClose } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/ui-store";

interface AudioPlayerProps {
  index: number;
  src: string;
  name: string;
  place?: "top" | "bottom" | "left" | "right";
  setVideo?: (src: string) => void;
  video?: string;
}

const ButtonAudio: React.FC<AudioPlayerProps> = ({
  index,
  src,
  name,
  place = "bottom",
  setVideo,
  video,
}) => {
  const { audioRefs, playAudio, pauseAudio, stopAudio, setVolume } = useAudio();
  const [volume, setLocalVolume] = useState<number>(1); // Âm lượng mặc định là 1 (100%)
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const {isHidden}:any = useUIStore();

  useEffect(() => {
    audioRefs.current[index] = audioRef.current;
  }, [index, audioRefs]);

  useEffect(() => {
    if (audioRef.current) {
      setVolume(index, volume);
    }
  }, [volume, index, setVolume]);

  return (
    <div
      data-tooltip-id={`tooltip-audio-${name}`}
      className={cn(
        "border-4 border-white duration-500 rounded-full size-11 cursor-pointer p-[2px] group bg-transparent "
      , isHidden ? "opacity-0" : ""
      )}
    >
      <audio ref={audioRef} src={src} className="hidden" />
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            playAudio(index);
          }}
          className={cn("hover:bg-sky-500/80 bg-transparent duration-500 size-full rounded-full cursor-pointer")}
        ></button>
      )}
      {isOpen && (
        <button
          onClick={() => {
            setIsOpen(false);
            pauseAudio(index);
          }}
          onMouseEnter={() => {
            setHovered(true);
          }}
          className="bg-sky-500/80 size-full rounded-full cursor-pointer"
        ></button>
      )}

      {/* <button onClick={stopAudio}>Stop All</button> */}
      {isOpen && place === "bottom" && (
        <div
          className={cn(
            "absolute top-[100%] left-1/2 transition-all -translate-x-1/2 translate-y-2 text-white bg-bgelement flex flex-col items-center p-2",
            hovered ? "scale-100" : "scale-0"
          )}
        >
          <p className="text-sm uppercase mb-1 font-semibold">{name}</p>
          <input
            id={`volume-${index}`}
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            className="accent-sky-500/80 "
            onChange={(e) => {
              const newVolume = parseFloat(e.target.value);
              setLocalVolume(newVolume);
            }}
          />
          <div
            onClick={() => setHovered(false)}
            className="absolute size-4 top-0 right-0 flex 
          items-center justify-center cursor-pointer hover:text-red-500"
          >
            <IoClose />
          </div>
        </div>
      )}

      {isOpen && place === "top" && (
        <div
          className={cn(
            "absolute bottom-[100%] transition-all left-1/2 -translate-x-1/2 -translate-y-2 text-white bg-bgelement flex flex-col items-center p-2",
            hovered ? "scale-100" : "scale-0"
          )}
        >
          <p className="text-sm uppercase mb-1 font-semibold">{name}</p>
          <input
            id={`volume-${index}`}
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            className="accent-sky-500/80 "
            onChange={(e) => {
              const newVolume = parseFloat(e.target.value);
              setLocalVolume(newVolume);
            }}
          />
          <div
            onClick={() => setHovered(false)}
            className="absolute size-4 top-0 right-0 flex 
          items-center justify-center cursor-pointer hover:text-red-500"
          >
            <IoClose />
          </div>
        </div>
      )}

      {isOpen && place === "left" && (
        <div
          className={cn(
            "absolute top-1/2 right-[100%] transition-all -translate-x-2 -translate-y-1/2 text-white bg-bgelement flex flex-col items-center p-2",
            hovered ? "scale-100" : "scale-0"
          )}
        >
          <p className="text-sm uppercase mb-1 font-semibold">{name}</p>
          <input
            id={`volume-${index}`}
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            className="accent-sky-500/80 "
            onChange={(e) => {
              const newVolume = parseFloat(e.target.value);
              setLocalVolume(newVolume);
            }}
          />
          <div
            onClick={() => setHovered(false)}
            className="absolute size-4 top-0 right-0 flex 
          items-center justify-center cursor-pointer hover:text-red-500"
          >
            <IoClose />
          </div>
        </div>
      )}

      {isOpen && place === "right" && (
        <div
          className={cn(
            "absolute transition-all top-1/2 left-[100%] translate-x-2 -translate-y-1/2 text-white bg-bgelement flex flex-col items-center p-2",
            hovered ? "scale-100" : "scale-0"
          )}
        >
          <p className="text-sm uppercase mb-1 font-semibold">{name}</p>
          <input
            id={`volume-${index}`}
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            className="accent-sky-500/80 "
            onChange={(e) => {
              const newVolume = parseFloat(e.target.value);
              setLocalVolume(newVolume);
            }}
          />
          <div
            onClick={() => setHovered(false)}
            className="absolute size-4 top-0 right-0 flex 
          items-center justify-center cursor-pointer hover:text-red-500"
          >
            <IoClose />
          </div>
        </div>
      )}

      {!isOpen && (
        <Tooltip
          className="font-semibold uppercase"
          id={`tooltip-audio-${name}`}
          content={name}
        />
      )}
    </div>
  );
};

export default ButtonAudio;

// components/AudioPlayer.tsx
import { useAudio } from '@/contexts/audio-context';
import React, { useRef, useEffect, useState } from 'react';


interface AudioPlayerProps {
  index: number;
  src: string;
  name: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ index, src, name }) => {
  const { audioRefs, playAudio, pauseAudio, stopAudio, setVolume } = useAudio();
  const [volume, setLocalVolume] = useState<number>(1); // Âm lượng mặc định là 1 (100%)
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRefs.current[index] = audioRef.current;
  }, [index, audioRefs]);

  useEffect(() => {
    if (audioRef.current) {
      setVolume(index, volume);
    }
  }, [volume, index, setVolume]);

  return (
    <div>
      <audio ref={audioRef} src={src} />
      <button onClick={() => playAudio(index)}>Play {name}</button>
      <button onClick={() => pauseAudio(index)}>Pause {name}</button>
      <button onClick={stopAudio}>Stop All</button>
      <div>
        <label htmlFor={`volume-${index}`}>Volume {name}:</label>
        <input
          id={`volume-${index}`}
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => {
            const newVolume = parseFloat(e.target.value);
            setLocalVolume(newVolume);
          }}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;

"use client";
import React from "react";
import AudioPlayer from "./audio";

function ManegeAudio() {
  const audioFiles = [
    { name: "Sound 1", src: "/sounds/city-rain.mp3" },
  ];
  return (
    <div className="fixed bottom-0 right-0 z-50">
      {audioFiles.map((file, index) => (
        <AudioPlayer
          key={index}
          index={index}
          src={file.src}
          name={file.name}
        />
      ))}
    </div>
  );
}

export default ManegeAudio;

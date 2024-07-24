"use client";
import React, { useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import dataSong from "../../data-songs";
import { useUIStore } from "@/stores/ui-store";
import { cn } from "@/lib/utils";

function ReactH5AudioPlayer() {
    const [listSong,setListSong] = useState(dataSong)
    const [id, setId] = useState(0);
    const {isHidden}:any = useUIStore();

    const nextSong = () => {
      if (id < listSong.length) {
        setId(id + 1);
      }
      if (id >= listSong.length - 1) {
        setId(0);
      }
    };
  
    const prevSong = () => {
      if (id !== 0) {
        setId(id - 1);
      }
      if (id < 0) setId(listSong.length);
    };
  return (
    <div className={cn("absolute duration-500 right-1/2 translate-x-1/2 bottom-2 z-40 w-[820px]",isHidden ? "opacity-0" : "")}>
      <AudioPlayer
        autoPlay
        src={listSong[id].src}
        onPlay={(e) => console.log("onPlay")}
        style={{ width: '100%', marginRight: 20,height:60}}
        showSkipControls
        showJumpControls={false}
        onClickNext={nextSong}
        onClickPrevious={prevSong}
        onEnded={nextSong}
        autoPlayAfterSrcChange={true}
        layout="horizontal"
        volume={0.2}
      />
    </div>
  );
}

export default ReactH5AudioPlayer;

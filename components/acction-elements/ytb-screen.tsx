"use client";
import React from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import Draggable from "react-draggable";
import { MdClose, MdDragHandle } from "react-icons/md";
import { useYTBStore } from "@/stores/ytb-store";

function YtbScreen() {
  const isOpenYTB = useYTBStore((state: any) => state.isOpen);
  const id = useYTBStore((state: any) => state.id);
  const stop = useYTBStore((state: any) => state.stop);

  if(!isOpenYTB){
    return null
  }

  return (
    <Draggable>
      <div className="absolute left-[480px] top-12 w-[400px] flex flex-col pb-2 justify-between
       bg-black/80 rounded-xl px-2 z-50">
        <div className="py-2 text-white flex items-center justify-between cursor-move">
          <MdDragHandle className="w-6 h-6" />
          <MdClose onClick={() => stop()} className="w-6 h-6 cursor-pointer hover:text-red-500 duration-300" />
        </div>
        <LiteYouTubeEmbed
          id={id} // Default none, id of the video or playlist
          adNetwork={true} // Default true, to preconnect or not to doubleclick addresses called by YouTube iframe (the adnetwork from Google)
          params="" // any params you want to pass to the URL, assume we already had '&' and pass your parameters string
          playlist={false} // Use true when your ID be from a playlist
          poster="hqdefault" // Defines the image size to call on first render as poster image. Possible values are "default","mqdefault",  "hqdefault", "sddefault" and "maxresdefault". Default value for this prop is "hqdefault". Please be aware that "sddefault" and "maxresdefault", high resolution images are not always avaialble for every video. See: https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
          title="YouTube Embed" // a11y, always provide a title for iFrames: https://dequeuniversity.com/tips/provide-iframe-titles Help the web be accessible ;)
          noCookie={true} // Default false, connect to YouTube via the Privacy-Enhanced Mode using https://www.youtube-nocookie.com/ Use this ref prop to programmatically access the underlying iframe element
        />
      </div>
    </Draggable>
  );
}

export default YtbScreen;

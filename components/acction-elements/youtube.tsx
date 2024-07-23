"use client";
import { cn, getYoutubeVideoId } from "@/lib/utils";
import { useYTBStore } from "@/stores/ytb-store";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaBackspace } from "react-icons/fa";

function Youtube({ currentAction,setCurrentMenu }: { currentAction: string, setCurrentMenu: Function }) {
  const [inputValue, setInputValue] = useState("");
  const play = useYTBStore((state: any) => state.play);

  function handleKeyPress(event: any) {
    // Kiểm tra nếu phím nhấn là phím Enter (mã 13)
    if (event.keyCode === 13) {
      // Gọi hàm xử lý khi Enter
      handleShowScreenYTB(inputValue);
    }
  }

  const handleShowScreenYTB = (url: any) => {
    try {
      const urlObj = new URL(url);
      if (
        urlObj.hostname === "www.youtube.com" &&
        urlObj.pathname === "/watch"
      ) {
        const videoId = urlObj.searchParams.get("v");
        if (videoId) {
          toast.success("Opening YouTube video...");
          play(videoId)
          setCurrentMenu("none")
        } else {
          toast.error("URL does not contain a video ID");
        }
      } else {
        toast.error("Not a valid YouTube URL");
      }
    } catch (error: Error | any) {
      toast.error(`Not a valid URL`);
    }
  };
  return (
    <div
      className={cn(
        "absolute top-1 bg-bgelement transition-all right-[120%] h-11 w-[400px] flex items-center px-2 rounded-lg",
        currentAction === "ytb" ? "opacity-100 right-[120%]" : "opacity-0 -z-[9999] right-[100%] scale-0"
      )}
    >
      <input
        onKeyDown={() => handleKeyPress(event)}
        type="url"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Paste a Youtube video URL here and press enter"
        className="bg-[#2c2c2c] text-gray-300 flex-1 rounded-lg px-4 outline-none py-1"
      />
      <div onClick={() => setInputValue("")} className="ml-2 cursor-pointer">
        <FaBackspace className="w-5 h-5 text-gray-300" />
      </div>
    </div>
  );
}

export default Youtube;

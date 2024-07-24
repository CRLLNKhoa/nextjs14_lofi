"use client";
import ButtonAudio from "@/components/acction-elements/buttom-audio";
import LoadingVideo from "@/components/acction-elements/loading-video";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { ImEnter } from "react-icons/im";
import { ImExit } from "react-icons/im";

export default function CafeChill() {
  const [video, setVideo] = useState("/videos/coffe-chill-day.mp4");
  const [choice, setChoice] = useState<string>("10");
  const [isLoading, setIsLoading] = useState(true);

  const handleChangeChoice = (index: number, replacement: string) => {
    function replaceCharAt(index: number, replacement: string) {
      if (index >= choice.length || index < 0) {
        return choice; // Trả về chuỗi gốc nếu chỉ số không hợp lệ
      }
      return (
        choice.substring(0, index) + replacement + choice.substring(index + 1)
      );
    }
    const result = replaceCharAt(index, replacement);
    setChoice(result);
  };

  useEffect(() => {
    const handleChangeVideo = () => {
      switch (choice) {
        case "10":
          setVideo("/videos/coffe-chill-night.mp4");
          break;
        case "11":
          setVideo("/videos/coffe-chill-day.mp4");
          break;
        case "00":
          setVideo("/videos/lofi-coffee-night.mp4");
          break;
        case "01":
          setVideo("/videos/lofi-coffee-day.mp4");
          break;
      }
    };
    handleChangeVideo();
  }, [choice]);

  return (
    <main className="fixed top-0 left-0 right-0 bottom-0 bg-black z-10">
      {isLoading ? <LoadingVideo /> : null}
      <video
        autoPlay
        muted
        loop
        controlsList="nodownload"
        className="object-fill w-full h-full"
        onLoadStart={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        src={video}
      ></video>
      <div
        className="flex items-center absolute left-4 bottom-2 z-20 
       gap-4 bg-bgelement px-4 py-2 rounded-xl text-white text-lg"
      >
        <button
          className={cn(
            "cursor-pointer size-8 flex items-center justify-center rounded-xl transition-all duration-300",
            choice[0] === "1" ? "bg-sky-500/60" : "bg-transparent"
          )}
          onClick={() => {
            handleChangeChoice(0, "1");
          }}
        >
          <ImEnter className="text-white" />
        </button>
        <button
          className={cn(
            "cursor-pointer size-8 flex items-center justify-center rounded-xl transition-all duration-300",
            choice[0] === "0" ? "bg-sky-500/60" : "bg-transparent"
          )}
          onClick={() => {
            handleChangeChoice(0, "0");
          }}
        >
          <ImExit className="text-white" />
        </button>
        <button
          className={cn(
            "cursor-pointer size-8 flex items-center justify-center rounded-xl transition-all duration-300",
            choice[1] === "1" ? "bg-sky-500/60" : "bg-transparent"
          )}
          onClick={() => {
            handleChangeChoice(1, "1");
          }}
        >
          <FaSun className="text-white" />
        </button>
        <button
          className={cn(
            "cursor-pointer size-8 flex items-center justify-center rounded-xl transition-all duration-300",
            choice[1] === "0" ? "bg-sky-500/60" : "bg-transparent"
          )}
          onClick={() => {
            handleChangeChoice(1, "0");
          }}
        >
          <FaMoon className="text-white" />
        </button>
      </div>
      {choice[0] === "1" ? (
        <>
          <div className="absolute left-[10%] top-[40%] z-20">
            <ButtonAudio
              index={14}
              src="/sounds/forestday.mp3"
              name={"Tiếng Rừng"}
            />
          </div>
          <div className="absolute left-[65%] top-[50%] z-20">
            <ButtonAudio
              index={15}
              src="/sounds/talking.mp3"
              name={"Trò chuyện"}
              place="bottom"
            />
          </div>
        </>
      ) :  <>
      <div className="absolute left-[80%] top-[50%] z-20">
        <ButtonAudio
          index={20}
          src="/sounds/typingphone.mp3"
          name={"Điện thoại"}
        />
      </div>
      <div className="absolute left-[10%] top-[40%] z-20">
        <ButtonAudio
          index={21}
          src="/sounds/talking.mp3"
          name={"Trò chuyện"}
          place="bottom"
        />
      </div>
    </>}
    </main>
  );
}

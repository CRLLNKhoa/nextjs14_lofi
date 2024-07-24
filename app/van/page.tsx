"use client";
import ButtonAudio from "@/components/acction-elements/buttom-audio";
import LoadingVideo from "@/components/acction-elements/loading-video";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { FaCloud, FaCloudRain, FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa6";

export default function Van() {
  const [video, setVideo] = useState("/videos/van.mp4");
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
          setVideo("/videos/van.mp4");
          break;
        case "00":
          setVideo("/videos/van-rain.mp4");
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
          <FaCloud className="text-white" />
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
          <FaCloudRain className="text-white" />
        </button>
      </div>
      {choice[0] === "0" && (
        <div className="absolute left-[50%] top-[30%] z-20">
          <ButtonAudio
            index={8}
            src="/sounds/city-rain.mp3"
            name={"tiếng trời mưa"}
          />
        </div>
      )}
      <div className="absolute left-[60%] top-[20%] z-20">
        <ButtonAudio
          index={7}
          src="/sounds/night.mp3"
          name={"Tiếng rừng"}
          place="bottom"
        />
      </div>
    </main>
  );
}

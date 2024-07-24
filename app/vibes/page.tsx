"use client";
import ButtonAudio from "@/components/acction-elements/buttom-audio";
import LoadingVideo from "@/components/acction-elements/loading-video";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { FaCloud, FaCloudRain, FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa6";

export default function Vibes() {
  const [video, setVideo] = useState("/videos/lvr-day.mp4");
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
          setVideo("/videos/lvr-day.mp4");
          break;
        case "00":
          setVideo("/videos/lvr-night.mp4");
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
          <FaSun className="text-white" />
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
          <FaMoon className="text-white" />
        </button>
      </div>
      {choice[0] === "0" && (
        <>
          <div className="absolute left-[40%] top-[10%] z-20">
            <ButtonAudio
              index={123}
              src="/sounds/night.mp3"
              name={"Tiếng trời đêm"}
              place="bottom"
            />
          </div>
        </>
      )}
      {choice[0] === "1" && (
        <div className="absolute left-[50%] top-[40%] z-20">
          <ButtonAudio
            index={55}
            src="/sounds/city-traffic.mp3"
            name={"thành Phố"}
          />
        </div>
      )}
      <div className="absolute left-[5%] top-[70%] z-20">
        <ButtonAudio
          index={66}
          src="/sounds/fire.mp3"
          name={"Lò sưởi"}
          place="right"
        />
      </div>
      <div className="absolute right-[10%] top-[10%] z-20">
        <ButtonAudio
          index={88}
          src="/sounds/clock.mp3"
          name={"Đồng hồ"}
          place="bottom"
        />
      </div>
      <div className="absolute right-[10%] top-[40%] z-20">
        <ButtonAudio
          index={99}
          src="/sounds/tank.mp3"
          name={"Bởi cá"}
          place="left"
        />
      </div>
    </main>
  );
}

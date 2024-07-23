import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";
import { MdSkipNext } from "react-icons/md";

const CountdownTimer = ({
  initialMinutes = 0,
  initialSeconds = 0,
  tab,
  isStart,
  setIsStart,
}: {
  tab: "pomodoro" | "short" | "long";
  initialMinutes: number;
  initialSeconds: number;
  isStart: boolean;
  setIsStart: Function;
}) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<any>(null);

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const sendNotification = () => {
    if (Notification.permission === 'granted') {
        new Notification('Đã hết giờ rồi!');
    }
};

useEffect(() => {
    if (isActive) {
        intervalRef.current = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            } else if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(intervalRef.current);
                    sendNotification();
                    setIsActive(false);
                    setIsStart(false)
                    setMinutes(initialMinutes);
                    setSeconds(initialSeconds);
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000);
    } else if (!isActive && intervalRef.current) {
        clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
}, [isActive, minutes, seconds]);

  return (
    <div className="flex flex-col justify-between gap-6 w-full items-center font-bold mt-4 h-[120px]">
      <div className="text-7xl text-white">
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <div>
        <div className="flex items-end justify-center relative">
          {!isActive ? (
            <button
              onClick={() => {
                setIsStart(!isStart), startTimer();
              }}
              className={cn(
                "uppercase select-none font-semibold bg-white w-[120px] h-[45px] rounded-lg text-xl border-b-4 border-gray-300 transition-all duration-100",
                isStart && "border-b-0",
                tab === "pomodoro" && "text-[#C15C5C]",
                tab === "short" && "text-[#4C9196]",
                tab === "long" && "text-[#4D7FA2]"
              )}
            >
              start
            </button>
          ) : (
            <button
              onClick={() => {
                setIsStart(!isStart), pauseTimer();
              }}
              className={cn(
                "uppercase select-none font-semibold bg-white w-[120px] h-[45px] rounded-lg text-xl border-b-4 border-gray-300 transition-all duration-100",
                isStart && "border-b-0",
                tab === "pomodoro" && "text-[#C15C5C]",
                tab === "short" && "text-[#4C9196]",
                tab === "long" && "text-[#4D7FA2]"
              )}
            >
              pause
            </button>
          )}
          <button  className={cn(
                "uppercase hover:text-white/75 text-white select-none absolute translate-x-20 top-1/2 -translate-y-1/2 flex items-center justify-center right-0 bottom-0 font-semibold w-[40px] h-[24px] rounded-lg text-xl transition-all duration-100",
                !isActive && "hidden",
              )} onClick={() => {setMinutes(0), setSeconds(3)}}>
                <MdSkipNext className=" text-4xl" />
                </button>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;

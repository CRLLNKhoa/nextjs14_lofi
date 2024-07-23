"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import CountdownTimer from "./count-down";
import Draggable from "react-draggable";
import { useTimeStore } from "@/stores/time-store";
import { MdClose, MdDragHandle } from "react-icons/md";

function Promodo() {
  const [tab, setTab] = useState<"pomodoro" | "short" | "long">("pomodoro");
  const [isStart, setIsStart] = useState(false);
  const isShow = useTimeStore((state:any) => state.isOpen);
  const hidden = useTimeStore((state:any) => state.stop);

  // Yêu cầu quyền thông báo khi component được tải
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  if(!isShow){
    return null
  }

  return (
    <Draggable>
      <div
        className="absolute z-50 select-none cursor-move shadow-lg 
        top-12 left-4 w-[400px] 
        min-h-[260px] transition-all flex items-center flex-col  
        px-2 rounded-xl bg-black/80"
      >
       <div className="w-full border-b border-white/20 py-2 mb-2 text-white flex items-center justify-between cursor-move">
          <MdDragHandle className="w-6 h-6" />
          <MdClose onClick={() => hidden()} className="w-6 h-6 cursor-pointer hover:text-red-500 duration-300" />
        </div>
        <div className="flex items-center justify-center w-full">
          <span
            onClick={() => setTab("pomodoro")}
            className={cn(
              "font-semibold text-white px-4 py-1 rounded-lg cursor-pointer select-none",
              tab === "pomodoro" && "bg-bgelement font-bold"
            )}
          >
            Pomodoro
          </span>
          <span
            onClick={() => setTab("short")}
            className={cn(
              "font-semibold text-white px-4 py-1 rounded-lg cursor-pointer select-none",
              tab === "short" && "bg-black font-bold"
            )}
          >
            Short Break
          </span>
          <span
            onClick={() => setTab("long")}
            className={cn(
              "font-semibold text-white px-4 py-1 rounded-lg cursor-pointer select-none",
              tab === "long" && "bg-black font-bold"
            )}
          >
            Long Break
          </span>
        </div>

        {tab === "pomodoro" && (
          <CountdownTimer
            tab={tab}
            isStart={isStart}
            setIsStart={setIsStart}
            initialMinutes={25}
            initialSeconds={0}
          />
        )}
        {tab === "short" && (
          <CountdownTimer
            tab={tab}
            isStart={isStart}
            setIsStart={setIsStart}
            initialMinutes={5}
            initialSeconds={0}
          />
        )}
        {tab === "long" && (
          <CountdownTimer
            tab={tab}
            isStart={isStart}
            setIsStart={setIsStart}
            initialMinutes={15}
            initialSeconds={0}
          />
        )}
      </div>
    </Draggable>
  );
}

export default Promodo;

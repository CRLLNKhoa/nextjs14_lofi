"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { FaGamepad, FaYoutube } from "react-icons/fa";
import { MdTimer } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { IoClose } from "react-icons/io5";
import Youtube from "./youtube";
import Promodo from "./promodo";
import { useTimeStore } from "@/stores/time-store";
import { useTaskStore } from "@/stores/task-store";
import { RiTaskFill } from "react-icons/ri";

function Tools({
  setCurrentMenu,
  currentMenu,
}: {
  currentMenu: string;
  setCurrentMenu: Function;
}) {
  const [currentAction, setCurrentAction] = useState<
    "none" | "ytb" | "promodo" | "task" | "scense"
  >("none");
  const hiddenTime =  useTimeStore((state:any) => state.play)
  const hiddenTask =  useTaskStore((state:any) => state.play)


  return (
    <>
      <div
        className={cn(
          "flex flex-col items-center py-4 gap-4 w-[36px] transition-all duration-500 absolute top-1/2 -translate-y-1/2  bg-bgelement rounded-lg",
          currentMenu === "tool"
            ? "opacity-100 -left-12"
            : "opacity-0 -left-8 -z-10"
        )}
      >
        <FaYoutube
          onClick={() => {
    
            setCurrentAction("ytb");
          }}
          data-tooltip-offset={20}
          id="tooltip-5"
          className="text-lg select-none text-gray-300 hover:text-orange-300 duration-300 cursor-pointer"
        />
        <MdTimer
        onClick={() => {
          hiddenTime();
          setCurrentAction("promodo");
        }}
          data-tooltip-offset={20}
          id="tooltip-6"
          className="text-lg select-none text-gray-300 hover:text-orange-300 duration-300 cursor-pointer"
        />
        <RiTaskFill
        onClick={() => {
          hiddenTask();
          setCurrentAction("task");
        }}
          data-tooltip-offset={20}
          id="tooltip-9"
          className="text-lg select-none text-gray-300 hover:text-orange-300 duration-300 cursor-pointer"
        />
        <FaUserAlt
          data-tooltip-offset={20}
          id="tooltip-7"
          className="text-md select-none text-gray-300 hover:text-orange-300 duration-300 cursor-pointer"
        />
        <FaGamepad
          data-tooltip-offset={20}
          id="tooltip-8"
          className="text-lg text-gray-300 hover:text-orange-300 duration-300 cursor-pointer"
        />
        <Youtube currentAction={currentAction} setCurrentMenu={setCurrentMenu} />
        <div
          onClick={() => {setCurrentMenu("none"); setCurrentAction("none")}}
          className="absolute -bottom-10 rounded-lg bg-bgelement w-[36px] flex items-center 
        justify-center py-2"
        >
          <IoClose className="text-xl text-gray-300 hover:text-orange-300 duration-300 cursor-pointer" />
        </div>
      </div>

      {currentAction === "none" && (
        <>
          <Tooltip anchorSelect="#tooltip-5" place="left">
            Phát Youtube trên nền
          </Tooltip>
          <Tooltip anchorSelect="#tooltip-6" place="left">
            Promodo
          </Tooltip>
          <Tooltip anchorSelect="#tooltip-7" place="left">
            Thông tin tài khoản
          </Tooltip>
          <Tooltip anchorSelect="#tooltip-8" place="left">
            Mini games
          </Tooltip>
          <Tooltip anchorSelect="#tooltip-9" place="left">
            Công việc
          </Tooltip>
        </>
      )}
    </>
  );
}

export default Tools;

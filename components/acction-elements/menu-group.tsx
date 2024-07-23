"use client";
import React, { useState } from "react";
import { RiSoundModuleFill } from "react-icons/ri";
import { WiMoonAltWaningCrescent1 } from "react-icons/wi";
import { PiPlaylistDuotone } from "react-icons/pi";
import { TbTools } from "react-icons/tb";
import { Tooltip } from "react-tooltip";
import { cn } from "@/lib/utils";
import Tools from "./tools";
import Playlist from "./playlist";
import Scense from "./scense";

function MenuGroup() {
  const [currentMenu, setCurrentMenu] = useState<
    "none" | "tool" | "playlist" | "setting" | "scense"
  >("none");
  const [isOpenTool, setIsOpenTool] = useState(false);
  const [isOpenPlaylist, setIsOpenPlaylist] = useState(false);
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const [isOpenScense, setIsOpebnScense] = useState(false);

  return (
    <>
      <div
        className="absolute top-1/2 -translate-y-1/2 right-4 flex items-center
        flex-col py-4 rounded-lg text-white text-sm w-[36px] gap-4 bg-bgelement 
        transistion-all duration-500 z-20"
      >
        <RiSoundModuleFill
          data-tooltip-delay-show={500}
          data-tooltip-offset={20}
          id="tooltip-1"
          className="text-xl select-none text-gray-300 hover:text-sky-500 duration-300 cursor-pointer"
        />
        <PiPlaylistDuotone
          onClick={() => {
            if (isOpenPlaylist) {
              setIsOpenPlaylist(false);
              setCurrentMenu("none");
            } else {
              setIsOpenPlaylist(true);
              setCurrentMenu("playlist");
              setIsOpebnScense(false);
              setIsOpenTool(false);
            }
          }}
          data-tooltip-offset={20}
          data-tooltip-delay-show={500}
          id="tooltip-2"
          className={cn(
            "text-2xl select-none text-gray-300 hover:text-sky-500 duration-300 cursor-pointer",
            isOpenPlaylist && "text-sky-500"
          )}
        />
        <WiMoonAltWaningCrescent1
          data-tooltip-offset={20}
          data-tooltip-delay-show={500}
          onClick={() => {
            if (isOpenScense) {
              setIsOpebnScense(false);
              setCurrentMenu("none");
            } else {
              setIsOpebnScense(true);
              setCurrentMenu("scense");
              setIsOpenPlaylist(false);
              setIsOpenTool(false);
            }
          }}
          id="tooltip-3"
          className={cn(
            "text-2xl select-none text-gray-300 hover:text-sky-500 duration-300 cursor-pointer",
            isOpenScense && "text-sky-500"
          )}
        />
        <TbTools
          data-tooltip-offset={20}
          onClick={() => {
            setIsOpenTool(!isOpenTool);
            setCurrentMenu("tool");
          }}
          id="tooltip-4"
          className="text-xl text-gray-300 hover:text-sky-500 duration-300 cursor-pointer"
        />
        <Playlist currentMenu={currentMenu} setCurrentMenu={setCurrentMenu} />
        <Scense currentMenu={currentMenu} setCurrentMenu={setCurrentMenu} />
        <Tools currentMenu={currentMenu} setCurrentMenu={setCurrentMenu} />
      </div>
      {!isOpenTool && !isOpenPlaylist && !isOpenSetting && (
        <>
          <Tooltip anchorSelect="#tooltip-1" place="left">
            Điều chỉnh âm thanh
          </Tooltip>
          <Tooltip anchorSelect="#tooltip-2" place="left">
            Playlist lofi
          </Tooltip>
          <Tooltip anchorSelect="#tooltip-3" place="left">
            Không gian
          </Tooltip>
        </>
      )}
    </>
  );
}

export default MenuGroup;

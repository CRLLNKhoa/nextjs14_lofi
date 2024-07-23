import { cn } from "@/lib/utils";
import React from "react";
import { IoClose } from "react-icons/io5";

function Playlist({
  setCurrentMenu,
  currentMenu,
}: {
  setCurrentMenu: Function;
  currentMenu: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center py-4 gap-4 w-[320px] transition-all duration-500 absolute top-1/2 -translate-y-1/2  bg-bgelement rounded-lg",
        currentMenu === "playlist"
          ? "opacity-100 right-[120%]"
          : "opacity-0 right-[100%] -z-10 scale-0"
      )}
    >
      <h1 className="font-semibold text-lg uppercase">Playlist</h1>

      <div className="grid grid-cols-3 w-full gap-1 px-4">
        <div className="rounded-lg cursor-pointer h-[120px] overflow-hidden bg-black">
          <img className="h-full w-full" src="/chill.png" alt="icon_chill" />
        </div>
        <div className="rounded-lg cursor-pointer h-[120px] overflow-hidden bg-black">
          <img className="h-full w-full" src="/focus.png" alt="icon_chill" />
        </div>
        <div className="rounded-lg cursor-pointer h-[120px] overflow-hidden bg-black">
          <img className="h-full w-full" src="/sleep.png" alt="icon_chill" />
        </div>
      </div>
    </div>
  );
}

export default Playlist;

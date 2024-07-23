import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { IoClose } from "react-icons/io5";

const list = [
  {
    thumbnail: "/seoul.png",
    link: "/seoul",
  },
  {
    thumbnail: "/kyoto.png",
    link: "/kyoto",
  },
  {
    thumbnail: "/van.png",
    link: "/van",
  },
  {
    thumbnail: "/honolulu.png",
    link: "/honolulu",
  },
  {
    thumbnail: "/bookcafe.png",
    link: "/bookcafe",
  },
  {
    thumbnail: "/loficafe.png",
    link: "/loficafe",
  },
  {
    thumbnail: "/vibes.png",
    link: "/vibes",
  },
];

function Scense({
  currentMenu,
  setCurrentMenu,
}: {
  currentMenu: string;
  setCurrentMenu: Function;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center py-4 gap-4 w-[300px] right-[120%] transition-all duration-500 absolute top-1/2 -translate-y-1/2  bg-bgelement rounded-xl",
        currentMenu === "scense"
          ? "opacity-100 z-10"
          : "opacity-0 translate-x-[150px] scale-0 -z-10"
      )}
    >
      <h1 className="font-semibold text-lg uppercase">Scense</h1>
      <div className="flex flex-col list-scense items-center h-[360px] overflow-y-auto w-full gap-2 px-4 pt-2">
        {list.map((item, index) => (
          <Link href={item.link} key={index}
            className="cursor-pointer rounded-xl w-[260px] h-[160px] duration-300 border-2 
            border-transparent hover:border-sky-500"
          >
            <img
              className="h-full w-full rounded-xl"
              src={item.thumbnail}
              alt="icon_chill"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Scense;

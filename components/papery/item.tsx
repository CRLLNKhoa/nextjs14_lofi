"use client"
import MDEditor from "@uiw/react-md-editor";
import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

function ItemPapery({ text }: { text: string }) {
  return (
      <div className="w-full min-h-[60px] bg-white rounded-lg flex items-center flex-col">
        <div className="flex items-center justify-end w-full p-2 pb-0">
          <div className="size-6 cursor-pointer duration-500 hover:bg-bgelement hover:text-white text-black rounded-md flex items-center justify-center">
            <HiOutlineDotsHorizontal className="" />
          </div>
        </div>
        <div className="p-4 pt-0 text-start w-full">
          <MDEditor.Markdown source={text} />
        </div>
      </div>
  );
}

export default ItemPapery;

"use client";
import React from "react";
import MessageForm from "./chat-ui";
import ChatRoom from "./chat-room";
import { IoClose } from "react-icons/io5";
import { MdDragHandle } from "react-icons/md";

function ChatTab() {
  return (
    <div className="absolute bottom-1/2 left-1/2 translate-y-1/2 z-50 pb-4 w-[420px] h-[420px] text-white
     bg-bgelement rounded-lg flex flex-col justify-between">
      <div className="flex items-center justify-between border-b py-2 px-2">
      <MdDragHandle className="size-6" />
      <IoClose className="size-6" />
      </div>
      <ChatRoom roomId={"room-2"} />
      <MessageForm roomId={"room-2"} />
    </div>
  );
}

export default ChatTab;

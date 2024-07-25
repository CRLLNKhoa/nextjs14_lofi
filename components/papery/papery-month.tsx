"use client";
import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import MDEditor from "@uiw/react-md-editor";
import ItemPapery from "./item";
import { groupEventsByDate } from "@/lib/utils";
import NewWindow from "react-new-window";
import { useNoteStore } from "@/stores/note-store";

function PaperyMonth() {
  const { notes }: any = useNoteStore();
  const data = groupEventsByDate(notes);
  return (
    <div className="p-4">
      <div
        className="bg-bgelement flex flex-col w-full
         overflow-y-auto rounded-xl px-4 py-4 select-none
        note-list gap-4"
      >
        {Object.keys(data).map((date, index) => (
          <div key={index}>
            <h3 className="text-white mb-2 font-semibold text-xl">{date}</h3>
            <div className="flex flex-col gap-4">
              {data[date].map((event: any, idx: any) => (
                <ItemPapery key={idx} text={event.text} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaperyMonth;

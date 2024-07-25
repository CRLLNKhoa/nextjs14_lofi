"use client";
import React, { useRef, useState } from "react";
import {
  MdOutlineCheck,
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineEmojiEmotions,
} from "react-icons/md";
import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu";
import { IoIosList } from "react-icons/io";
import { emoji } from "@/emoji";
import { cn, generateRandomId, storeArray } from "@/lib/utils";
import { useNoteStore } from "@/stores/note-store";
import toast from "react-hot-toast";
import { Tooltip } from "react-tooltip";

function NewPapery() {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isShowEmoji, setIsShowEmoji] = useState(false);
  const { addNote, close, isOpen, notes }: any = useNoteStore();

  const insertTextAtCursor = (text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;

    // Cập nhật giá trị của textarea
    textarea.value =
      textarea.value.slice(0, start) + text + textarea.value.slice(end);

    // Đặt lại con trỏ vào vị trí sau ký tự vừa thêm
    textarea.selectionStart = textarea.selectionEnd = start + text.length;

    // Tập trung vào textarea
    textarea.focus();
  };

  const handleSave = () => {
    if (textareaRef.current?.value === "") {
      toast.error("Vui lòng nhập nội dung !");
      return;
    }
    addNote({
      id: generateRandomId(),
      text: textareaRef.current?.value,
      date: `${currentYear}-${currentMonth}-${currentDay}`,
    });
    storeArray("papery", [
      ...notes,
      {
        id: generateRandomId(),
        text: textareaRef.current?.value,
        date: `${currentYear}-${currentMonth}-${currentDay}`,
      },
    ]);
    toast.success("Đã lưu !");
    close();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-0 right-0 top-0 left-0 z-50 bg-black/50">
      <div
        className="w-[620px] min-h-[340px] bg-white shadow-2xl  text-black
        absolute top-1/2 rounded-xl right-1/2 translate-x-1/2 -translate-y-1/2 
        z-50 flex flex-col p-4"
      >
        <p className="text-xs">
          DATE: {currentDay}-{currentMonth}-{currentYear}
        </p>
        <textarea
          ref={textareaRef}
          className="mt-4 bg-transparent flex-1 outline-none text-sm"
          name="input-new"
          id="input-new"
          placeholder="Nhập nội dung..."
        ></textarea>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsShowEmoji(!isShowEmoji)}
              className="duration-300 hover:bg-slate-600/60 p-1 rounded-md"
            >
              <MdOutlineEmojiEmotions />
            </button>
            <button
              onClick={() => insertTextAtCursor("#")}
              className="duration-300 hover:bg-slate-600/60 p-1 rounded-md"
            >
              <LuHeading1 />
            </button>
            <button
              onClick={() => insertTextAtCursor("##")}
              className="duration-300 hover:bg-slate-600/60 p-1 rounded-md"
            >
              <LuHeading2 />
            </button>
            <button
              onClick={() => insertTextAtCursor("###")}
              className="duration-300 hover:bg-slate-600/60 p-1 rounded-md"
            >
              <LuHeading3 />
            </button>
            <button
              onClick={() => insertTextAtCursor("[ ]")}
              className="duration-300 hover:bg-slate-600/60 p-1 rounded-md"
            >
              <MdOutlineCheckBoxOutlineBlank />
            </button>
            <button
              onClick={() => insertTextAtCursor("[X]")}
              className="duration-300 hover:bg-slate-600/60 p-1 rounded-md"
            >
              <MdOutlineCheck />
            </button>
            <button
              onClick={() => insertTextAtCursor("- ")}
              className="duration-300 hover:bg-slate-600/60 p-1 rounded-md"
            >
              <IoIosList />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => close()}
              className="text-sm text-white uppercase bg-red-500/60 px-2 py-1 rounded-md font-semibold"
            >
              Trở lại
            </button>
            <button
              onClick={handleSave}
              className="bg-sky-500/80 text-white px-4 rounded-md text-sm uppercase py-1 font-semibold"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "w-[700px] min-h-[140px] shadow-2xl duration-500 bg-white absolute top-4 left-1/2 -translate-x-1/2 z-[60] rounded-xl flex flex-col text-white p-4",
          isShowEmoji ? "opacity-100" : "opacity-0 scale-0 -z-10"
        )}
      >
        <h1 className="text-sm text-black font-semibold">Emoji:</h1>
        <div className="flex items-center flex-wrap mt-2">
          {emoji.map((item: any, index: number) => (
            <button
              onClick={() => insertTextAtCursor(item)}
              key={index}
              className="duration-300 hover:bg-slate-600/60 p-1 rounded-md"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewPapery;

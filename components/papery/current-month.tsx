"use client";
import { cn, extractFirstEmoji, getArray } from "@/lib/utils";
import { useNoteStore } from "@/stores/note-store";
import { TPapery } from "@/types/papery";
import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoClose, IoMoveSharp } from "react-icons/io5";
import { MdClose, MdDragHandle, MdPostAdd } from "react-icons/md";
import { SiReaddotcv } from "react-icons/si";
import { Tooltip } from "react-tooltip";
import NewWindow from "react-new-window";
import PaperyMonth from "./papery-month";
import { usePaperyStore } from "@/stores/papery";

function CurrentMonth() {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  const [month, setMonth] = useState(today.getMonth() + 1); // Tháng hiện tại (getMonth trả về giá trị từ 0-11)
  const [year, setYear] = useState(today.getFullYear()); // Năm hiện tại\
  const { notes, open, getNotes }: any = useNoteStore();
  const [isOpen, setIsOpen] = useState(false);
  const {isOpen: isOpenPapery, play, stop}:any = usePaperyStore()

  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();

  useEffect(() => {
    const getList = () => {
      const storedItems = getArray("papery");
      getNotes(storedItems);
    };
    getList();
  }, []);

  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const blankDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    blankDays.push(null);
  }

  const isToday = (day: any) => {
    return day === currentDay && month === currentMonth && year === currentYear;
  };

  const handlePreviousMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const getNotesForDay = (day: any) => {
    const date = `${year}-${month}-${day}`;
    return notes.filter((note: TPapery) => note.date === date);
  };

  const handleOpenNewWindow = () => {
    setIsOpen(true);
  };

  return (
    <Draggable handle="strong">
      <div
        className={cn(
            "bg-bgelement absolute top-12 duration-300 transition-all left-4 z-50 flex flex-col w-[320px] rounded-xl px-4 py-4 select-none",
            isOpenPapery ? "opacity-100" : "opacity-0 scale-0"
        )}
      >
        <div
          className="text-white"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "10px",
          }}
        >
          {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
            <div
              key={day}
              style={{ fontWeight: "semibold", fontSize: "12px" }}
              className="text-center"
            >
              {day}
            </div>
          ))}
          {blankDays.map((_, index) => (
            <div key={index}></div>
          ))}
          {days.map((day) => {
            const dayNotes = getNotesForDay(day);
            const firstNote = dayNotes[0];
            const firstEmoji = firstNote
              ? extractFirstEmoji(firstNote.text)
              : "";
            return (
              <div key={day} className="flex flex-col items-center gap-1">
                <div
                  className={cn(
                    "w-[27px] h-[26px] bg-stone-600 rounded-md flex items-center justify-center",
                    firstEmoji && "bg-stone-800"
                  )}
                >
                  {firstEmoji}
                </div>
                <p
                  className={cn(
                    "text-[10px]  px-1 rounded-lg",
                    isToday(day) ? "bg-sky-500" : "text-stone-400"
                  )}
                >
                  {day}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col items-center gap-2 absolute top-4 right-0 translate-x-10">
          <strong
            id="move"
            className="flex items-center py-2 cursor-pointer bg-bgelement
            justify-center rounded-lg text-white text-xl size-[36px]"
          >
            <IoMoveSharp />
          </strong>
          <div
            id="changemonth"
            className="bg-bgelement flex flex-col items-center w-[36px] rounded-lg"
          >
            <div
              onClick={handlePreviousMonth}
              className="flex items-center py-2 cursor-pointer
            justify-center rounded-lg text-white text-xl"
            >
              <IoIosArrowUp />
            </div>
            <div
              className="flex items-center select-none
            justify-center rounded-lg text-white text-xl"
            >
              {month}
            </div>
            <div
              onClick={handleNextMonth}
              className="flex items-center py-2 cursor-pointer
            justify-center rounded-lg text-white text-xl"
            >
              <IoIosArrowDown />
            </div>
          </div>
          <div
            onClick={() => open()}
            id="add"
            className="flex items-center py-2 cursor-pointer bg-bgelement
            justify-center rounded-lg text-white text-xl size-[36px]"
          >
            <MdPostAdd />
          </div>

          <div
            id="view-detail"
            onClick={handleOpenNewWindow}
            className="flex items-center py-2 cursor-pointer bg-bgelement
            justify-center rounded-lg text-white text-xl size-[36px]"
          >
            <SiReaddotcv />
          </div>
          <div
            onClick={() => stop()}
            className="flex items-center py-2 cursor-pointer bg-bgelement
            justify-center rounded-lg text-white text-xl size-[36px]"
          >
            <IoClose />
          </div>
        </div>

        {isOpen && (
          <NewWindow onUnload={() => setIsOpen(false)}>
            <PaperyMonth />
          </NewWindow>
        )}

        <Tooltip anchorSelect="#move" content="Di chuyển" place="right" />
        <Tooltip
          anchorSelect="#changemonth"
          content="Di chuyển"
          place="right"
        />
        <Tooltip anchorSelect="#add" content="Thêm mới" place="right" />
        <Tooltip
          anchorSelect="#view-detail"
          content="Xem chi tiết"
          place="right"
        />
       
      </div>
    </Draggable>
  );
}

export default CurrentMonth;

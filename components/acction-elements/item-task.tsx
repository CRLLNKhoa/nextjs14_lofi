"use client";
import { cn, storeArray } from "@/lib/utils";
import React, { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TTask } from "./tasks";

function ItemTask({ data,setList,list }: { data: TTask,setList: Function, list: TTask[] }) {
  const [task, setTask] = useState(data);
  const [isDoing, setIsDoing] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleCompleted = () => {
    setTask({ ...task, isComplete: !task.isComplete });
    setList(list.map((item) => (item.id === task.id ? task : item)));
    storeArray("lofi-tasks", list.map((item) => (item.id === task.id ? task : item)));
  };

  const handleSaveEdit = () => {
    setList(list.map((item) => (item.id === task.id ? task : item)));
    storeArray("lofi-tasks", list.map((item) => (item.id === task.id ? task : item)));
    setIsEdit(false);
  };

  const handleDelete = () => {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
    setList(list.filter((item) => item.id !== task.id));
    storeArray("lofi-tasks", list.filter((item) => item.id !== task.id));
    } else {
      return;
    }
  }

  return (
    <div
      onClick={() => setIsDoing(!isDoing)}
      className="bg-white/90 w-full p-4 rounded-lg relative flex flex-col"
    >
      <div className="flex items-center w-full">
        {/* NOTE Body */}
        {!isEdit && (
          <div className="flex items-center flex-1">
            {/* NOTE Checkbox */}
            <FaCircleCheck
              onClick={handleCompleted}
              className={cn(
                "z-10 text-gray-300 hover:text-gray-600 w-[26px] h-[26px] cursor-pointer",
                task.isComplete && "text-green-500"
              )}
            />
            {/* NOTE Title */}
            <h2
              className={cn(
                "text-gray-500 flex-1 line-clamp-2 ml-2 font-semibold",
                task.isComplete && "line-through"
              )}
            >
              {task.title}
            </h2>
            {/* NOTE Time */}
            <div className="flex items-center font-semibold text-gray-400 text-sm">
              <p>0</p>
              <p className="mx-[1px]">/</p>
              <p>{task.pomodoro}</p>
            </div>
            {/* NOTE Edit Button` */}
            <button
              onClick={() => setIsEdit(true)}
              className="border ml-4 py-1 rounded-lg hover:bg-bgelement/40 text-gray-400 duration-500 hover:text-white"
            >
              <BsThreeDotsVertical className="w-6 h-6 " />
            </button>
            {/* NOTE Edit Form */}
          </div>
        )}
      </div>

      {/* NOTE Edit Form */}
      {isEdit && (
        <div className="flex flex-col pb-12">
          <input
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            type="text"
            placeholder="Bạn đang làm việc gì?"
            className="text-lg font-semibold outline-none"
          />
          <div className="flex flex-col gap-2 mt-2">
            <h2>Thời gian (số pomodoro)</h2>
            <input
              value={task.pomodoro}
              onChange={(e) =>
                setTask({ ...task, pomodoro: Number(e.target.value) })
              }
              type="number"
              step={0.1}
              min={0}
              className="w-24 bg-gray-200 outline-none py-1 px-4 rounded-lg font-semibold text-gray-700"
            />
          </div>
          <div className="flex items-center mt-2">
            <span className="underline underline-offset-2 cursor-pointer">
              + Thêm ghi chú
            </span>
          </div>
          <textarea
            value={task.note}
            onChange={(e) => setTask({ ...task, note: e.target.value })}
            className="bg-gray-200 rounded-lg p-2 mt-2 outline-none"
            placeholder="Một số ghi chú..."
          />
          <div
            className="h-12 flex items-center justify-between bg-gray-200 
          rounded-b-lg absolute bottom-0 left-0 right-0 px-4 font-semibold text-gray-500"
          >
            <span onClick={handleDelete} className="cursor-pointer">Delete</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsEdit(false)}
                className="cursor-pointer"
              >
                Cancel
              </button>
              <button onClick={handleSaveEdit} className="bg-black text-white px-4 py-[2px] rounded-lg">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NOTE Notes */}
      {task.note && (
        <p className="text-gray-500 text-sm mt-2">{task.note}</p>
      )}
    </div>
  );
}

export default ItemTask;

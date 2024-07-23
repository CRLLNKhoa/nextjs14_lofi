"use client";
import React, { useEffect, useId, useState } from "react";
import { MdClose, MdDragHandle } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import ItemTask from "./item-task";
import Draggable from "react-draggable";
import { generateRandomId, getArray, storeArray } from "@/lib/utils";
import toast from "react-hot-toast";
import { useTaskStore } from "@/stores/task-store";

export type TTask = {
  id: string;
  title: string;
  note: string;
  isComplete: boolean;
  pomodoro: number;
  create_at: number;
};

function Tasks() {
  const id = useId();
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState<TTask[]>([]);
  const isShow = useTaskStore((state: any) => state.isOpen);
  const hidden = useTaskStore((state: any) => state.stop);
  const [newTask, setNewTask] = useState<TTask>({
    id: generateRandomId("task-lofi-id", 15),
    title: "",
    note: "",
    isComplete: false,
    pomodoro: 0,
    create_at: new Date().getTime(),
  });

  useEffect(() => {
    setIsLoading(true);
    const getList = () => {
      const storedItems = getArray("lofi-tasks");
      setList(storedItems);
      setIsLoading(false);
    };
    getList();
  }, []);
  
  const addItem = (item: TTask) => {
    if (newTask.title === "") {
      toast.error("Vui lòng nhập đủ thông tin !");
      return;
    }
    const updatedItems = [...list, item];
    setNewTask({
      id: generateRandomId("task-lofi-id", 15),
      title: "",
      note: "",
      isComplete: false,
      pomodoro: 0,
      create_at: new Date().getTime(),
    });
    setIsOpenAdd(false);
    setList(updatedItems);
    toast.success("Task added !");
    storeArray("lofi-tasks", updatedItems);
  };

  if (!isShow) {
    return null;
  }

  return (
    <Draggable>
      <div
        className="absolute z-50 select-none shadow-lg 
        top-12 left-4 w-[400px] 
        h-[460px] transition-all flex items-center flex-col  
        px-2 rounded-xl bg-black/80 pb-4"
      >
        {/* NOTE Header */}
        <div className="w-full py-2 mb-2 text-white flex items-center justify-between cursor-move">
          <MdDragHandle className="w-6 h-6" />
          <MdClose
            onClick={() => hidden()}
            className="w-6 h-6 cursor-pointer hover:text-red-500 duration-300"
          />
        </div>

        {/* NOTE List task */}
        <div className="flex flex-col w-full mt-4 h-[380px] overflow-y-auto space-y-4 scroll-none">
          {/* NOTE Add task */}
          {isOpenAdd ? (
            <div className=" flex flex-col p-4 pb-16 relative bg-white rounded-lg">
              <input
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                type="text"
                placeholder="Bạn đang làm việc gì?"
                className="text-lg font-semibold outline-none"
              />
              <div className="flex flex-col gap-2 mt-2">
                <h2>Thời gian (số pomodoro)</h2>
                <input
                  value={newTask.pomodoro}
                  onChange={(e) =>
                    setNewTask({ ...newTask, pomodoro: Number(e.target.value) })
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
                value={newTask.note}
                onChange={(e) =>
                  setNewTask({ ...newTask, note: e.target.value })
                }
                className="bg-gray-200 rounded-lg p-2 mt-2 outline-none"
                placeholder="Một số ghi chú..."
              />
              <div
                className="h-12 flex items-center justify-between bg-gray-200 
              rounded-b-lg absolute bottom-0 left-0 right-0 px-4 font-semibold text-gray-500"
              >
                <div className="flex items-center justify-between gap-4 w-full">
                  <button
                    onClick={() => setIsOpenAdd(false)}
                    className="cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => addItem(newTask)}
                    className="bg-black text-white px-4 py-[2px] rounded-lg"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              onClick={() => setIsOpenAdd(true)}
              className="text-white border border-white/40 w-full border-dashed p-2 
          flex items-center justify-center rounded-lg gap-2 cursor-pointer hover:border-white duration-500"
            >
              <IoIosAddCircleOutline />
              <p className="text-sm">Thêm công việc</p>
            </div>
          )}
          {list.sort((a: TTask, b: TTask) => a.create_at - b.create_at).map((item: TTask) => (
            <ItemTask key={item.id} data={item} setList={setList} list={list} />
          ))}
          {isLoading && (
            <div className="w-full h-[240px] flex items-center justify-center text-white">
              <p>đang tải</p>
            </div>
          )}
          {!isLoading && list.length === 0 && (
            <div className="w-full h-[240px] flex items-center justify-center text-white">
              <p>Chưa có công việc nào.</p>
            </div>
          )}
        </div>
      </div>
    </Draggable>
  );
}

export default Tasks;

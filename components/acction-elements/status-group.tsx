"use client";
import React from "react";
import Time from "./time";
import TimeOnline from "./time-online";
import ToogleUi from "./toogle-ui";
import UserOnline from "./user-online";
import { useUIStore } from "@/stores/ui-store";
import { cn } from "@/lib/utils";

function StatusGroup() {
  const {isHidden}:any = useUIStore();
  return (
    <div
      className={cn(
        "rounded-ful absolute top-2 duration-500 left-4 text-white text-sm flex items-center gap-4 z-40",
        isHidden ? "opacity-0" : ""
      )}
    >
      <Time />
      <TimeOnline />
      <UserOnline />
      <ToogleUi />
    </div>
  );
}

export default StatusGroup;

"use client";
import { useUIStore } from "@/stores/ui-store";
import React from "react";
import { PiVisorFill,PiVisorLight } from "react-icons/pi";
import { Tooltip } from "react-tooltip";

function ButtonHiddenUI() {
  const { isHidden, hidden, show }: any = useUIStore();
  const handleToggleHiddenUI = () => {
    if (isHidden) {
      hidden();
    } else {
      show();
    }
  };
  return (
    <>
        <button id="button-ui" className="bg-bgelement size-10 flex items-center justify-center rounded-xl"  onClick={handleToggleHiddenUI}>
          {isHidden ? <PiVisorFill /> : <PiVisorLight />}
        </button>
        <Tooltip anchorSelect="#button-ui" content="Ẩn/Hiện UI" />
    </>
  );
}

export default ButtonHiddenUI;

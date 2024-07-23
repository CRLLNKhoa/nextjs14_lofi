"use client";
import React, { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";

function Time() {
  const [time, setTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (mounted) {
      const timer = setInterval(() => {
        setTime(new Date());
      }, 1000);

      return () => clearInterval(timer); // Cleanup interval on component unmount
    }
  }, [mounted]);

  const formatTime = (date: Date) => {
    return date
      ? date.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      : "";
  };
  if (!time) {
    return null;
  }

  return (
    <>
      <div
        id="tooltip-time"
        className="bg-bgelement h-[28px] px-4 py-1 rounded-lg font-semibold select-none"
      >
        <p>{formatTime(time)}</p>
      </div>
      <Tooltip anchorSelect="#tooltip-time" place="bottom">
        Thời gian hiện tại
      </Tooltip>
    </>
  );
}

export default Time;

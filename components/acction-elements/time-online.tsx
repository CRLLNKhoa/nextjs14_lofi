"use client";
import React, { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";

function TimeOnline() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  const formatTime = (seconds:number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const formattedHrs = hrs > 0 ? `${hrs < 10 ? '0' : ''}${hrs}:` : '';
    const formattedMins = `${mins < 10 ? '0' : ''}${mins}`;
    const formattedSecs = `${secs < 10 ? '0' : ''}${secs}`;

    return `${formattedHrs}${formattedMins}:${formattedSecs}`;
  };

  return (
    <>
      <div
        id="tooltip-time-online"
        className="bg-bgelement flex items-center justify-center h-[28px] px-4 py-1 min-w-[140px] rounded-lg font-semibold select-none"
      >
        <p>Online: {formatTime(seconds)}</p>
      </div>
      <Tooltip anchorSelect="#tooltip-time-online" place="top">
        Thời gian bạn đã online
      </Tooltip>
    </>
  );
}

export default TimeOnline;

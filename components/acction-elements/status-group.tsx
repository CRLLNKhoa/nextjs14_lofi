import React from "react";
import Time from "./time";
import TimeOnline from "./time-online";
import ToogleUi from "./toogle-ui";
import UserOnline from "./user-online";

function StatusGroup() {
  return (
    <div
      className="rounded-ful absolute top-2 left-4 text-white text-sm 
    flex items-center gap-4 z-40"
    >
      <Time />
      <TimeOnline />
      <UserOnline />
      <ToogleUi />
    </div>
  );
}

export default StatusGroup;

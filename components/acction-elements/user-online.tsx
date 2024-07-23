"use client";
import { useEffect, useState } from "react";
import { RiRadioButtonLine } from "react-icons/ri";
import { collection, onSnapshot } from 'firebase/firestore';
import db from "@/lib/fireStore";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import { Tooltip } from "react-tooltip";
import { generateRandomId } from "@/lib/utils";

function addLeadingZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

function UserOnline() {
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);
  useOnlineStatus();
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'onlineUsers'), (snapshot) => {
      setOnlineUsersCount(snapshot.size);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div id="tooltip-users-online" className="bg-bgelement px-2 pr-4 h-[28px] rounded-lg font-semibold select-none flex items-center">
      <RiRadioButtonLine className="text-green-600 mr-2 animate-pulse" />{" "}
      <p className="text-xs">{addLeadingZero(onlineUsersCount)}</p>
      <Tooltip anchorSelect="#tooltip-users-online" place="bottom">
        Số người đang online
      </Tooltip>
    </div>
  );
}

export default UserOnline;

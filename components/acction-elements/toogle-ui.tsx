"use client";
import { quotes } from "@/qoutes";
import React from "react";
import { Tooltip } from "react-tooltip";

function ToogleUi() {
  // Hàm để lấy câu ngẫu nhiên mỗi ngày
  function getDailyQuote(): string {
    // Lấy ngày hiện tại
    const today: Date = new Date();

    // Chuyển đổi ngày hiện tại thành số nguyên duy nhất
    const startOfYear: Date = new Date(today.getFullYear(), 0, 0);
    const dayOfYear: number = Math.floor(
      (today.getTime() - startOfYear.getTime()) / 86400000
    );

    // Tính chỉ số câu nói từ số ngày trong năm
    const quoteIndex: number = dayOfYear % quotes.length;

    // Lấy và trả về câu nói tương ứng
    return quotes[quoteIndex];
  }

  return (
    <>
      <div
        id="tooltip-toogle"
        className="bg-bgelement h-[28px] px-4 py-1 rounded-lg font-semibold select-none"
      >
        <p>"{getDailyQuote()}"</p>
      </div>
      <Tooltip anchorSelect="#tooltip-toogle" place="bottom">
        Câu nói hay mỏi ngày
      </Tooltip>
    </>
  );
}

export default ToogleUi;

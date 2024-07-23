"use client"
import React from 'react'
import { Tooltip } from 'react-tooltip'

function ToogleUi() {
  return (
    <>
    <div
      id="tooltip-toogle"
      className="bg-bgelement h-[28px] px-4 py-1 rounded-lg font-semibold select-none"
    >
      <p>Press the H key on the keyboard to hide/show the interface.</p>
    </div>
    <Tooltip anchorSelect="#tooltip-toogle" place="bottom">
        Ẩn / Hiện UI
    </Tooltip>
  </>
  )
}

export default ToogleUi
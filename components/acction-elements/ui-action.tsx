"use client";
import React from "react";
import FullscreenButton from "./button-fullscreen";
import ButtonHiddenUI from "./button-hidden-ui";

function UiAction() {
  return (
    <div
      className="absolute bottom-2 right-4 z-20 flex items-center
  text-white text-lg gap-4"
    >
      <ButtonHiddenUI />
      <FullscreenButton />
    </div>
  );
}

export default UiAction;

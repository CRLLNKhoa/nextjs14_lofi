// components/FullscreenButton.js
import { useState } from "react";
import { BsFullscreen } from "react-icons/bs";
import { BsFullscreenExit } from "react-icons/bs";
import { Tooltip } from "react-tooltip";

const FullscreenButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
   <>
        <button id="button-screen" className="bg-bgelement size-10 flex items-center justify-center rounded-xl" onClick={handleToggleFullscreen}>
          {isFullscreen ? <BsFullscreenExit /> : <BsFullscreen />}
        </button>
        <Tooltip anchorSelect="#button-screen" content="Toàn màn hình" />
   </>
  );
};

export default FullscreenButton;

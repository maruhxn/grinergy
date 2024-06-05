import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useFullScreen: (
  el: any
) => [boolean, Dispatch<SetStateAction<boolean>>] = (el: any) => {
  const [full, setFull] = useState(false);
  const revert = () => {
    if (!document.fullscreenElement) {
      setFull(false);
      document.removeEventListener("fullscreenchange", revert);
    }
  };

  useEffect(() => {
    if (full) {
      const elem = el.current;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
        document.addEventListener("fullscreenchange", revert);
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
        document.addEventListener("fullscreenchange", revert);
      } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
        document.addEventListener("fullscreenchange", revert);
      } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
        document.addEventListener("fullscreenchange", revert);
      } else if (elem.webkitEnterFullscreen) {
        elem.webkitEnterFullscreen();
        document.addEventListener("fullscreenchange", revert);
      }
    }
    return () => {
      document.removeEventListener("fullscreenchange", revert);
    };
  }, [full]);

  return [full, setFull];
};

export default useFullScreen;

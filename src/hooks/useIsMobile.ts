import { useEffect, useState } from "react";

const useIsMobile = () => {
  const [windowSize, setWindowSize] = useState<number>(0);

  const handleResize = () => {
    setWindowSize(window.innerWidth);
  };

  useEffect(() => {
    setWindowSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = windowSize < 652;
  return isMobile;
};

export default useIsMobile;

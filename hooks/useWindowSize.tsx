// taken from here: https://egghead.io/lessons/egghead-write-a-custom-react-hook-that-returns-the-browser-s-width-and-height
// regarding the typeof window !== 'undefined' check:
// could be done this way: https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
// but then everything that imports it would have to be aware
import { useState, useEffect } from "react";
const getSize = () => {
  return {
    innerHeight: typeof window !== "undefined" ? window.innerHeight : 0,
    innerWidth: typeof window !== "undefined" ? window.innerWidth : 0,
  };
};

const useWindowSize = (): { innerHeight: number; innerWidth: number } => {
  let [windowSize, setWindowSize] = useState(getSize());
  const handleResize = () => {
    setWindowSize(getSize());
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};

export default useWindowSize;

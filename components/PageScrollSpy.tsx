"use client";

import React, { useEffect } from "react";

interface PageScrollSpyProps {
  triggerElementRef: React.RefObject<HTMLElement>;
  scrollEvent: (closeToBottom: boolean) => void;
}

function PageScrollSpy({ triggerElementRef, scrollEvent }: PageScrollSpyProps) {
  useEffect(() => {
    const onScroll = () => {
      const { scrollHeight, clientHeight } = document.documentElement;
      if (scrollHeight === clientHeight) {
        scrollEvent(true);
        return;
      }
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;

      const triggerElScroll =
        triggerElementRef.current && triggerElementRef.current.offsetTop;

      if (triggerElScroll && winScroll >= triggerElScroll) {
        scrollEvent(true);
        return;
      }

      scrollEvent(false);
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [triggerElementRef, scrollEvent]);
  return <></>;
}

export default PageScrollSpy;

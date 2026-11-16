"use client";

import { useEffect, useRef, useState } from "react";

export function AcrylicDetailFrame() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(1000);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    let observer: ResizeObserver | null = null;
    let animationFrame = 0;
    let disposed = false;

    const measure = () => {
      if (disposed) return;
      const content = frame.contentDocument?.getElementById("detail-page");
      if (!content) return;
      const nextHeight = Math.ceil(content.getBoundingClientRect().height);
      if (nextHeight > 0) setHeight((current) => current === nextHeight ? current : nextHeight);
    };
    const schedule = () => {
      if (disposed) return;
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(measure);
    };
    const connect = () => {
      observer?.disconnect();
      const content = frame.contentDocument?.getElementById("detail-page");
      if (!content) return;
      observer = new ResizeObserver(schedule);
      observer.observe(content);
      void frame.contentDocument?.fonts.ready.then(schedule);
      schedule();
    };

    frame.addEventListener("load", connect);
    window.addEventListener("resize", schedule);
    if (frame.contentDocument?.readyState === "complete") connect();
    return () => {
      disposed = true;
      frame.removeEventListener("load", connect);
      window.removeEventListener("resize", schedule);
      observer?.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <iframe ref={frameRef} src="/acrylic-letters-content.html" title="아크릴 글자 상세 안내" height={height} scrolling="no" style={{ display: "block", width: "100%", border: 0, background: "#e6e7e2" }} />;
}

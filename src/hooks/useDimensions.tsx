import { useEffect, useState } from "react";

export const useDimensions = (targetRef: React.RefObject<HTMLDivElement>) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const borderBox = entry.borderBoxSize[0];
      setDimensions({
        width: borderBox?.inlineSize ?? entry.contentRect.width,
        height: borderBox?.blockSize ?? entry.contentRect.height,
      });
    });

    observer.observe(target);
    return () => observer.disconnect();
  }, [targetRef]);

  return dimensions;
};

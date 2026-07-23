import { useLayoutEffect, useState } from "react";

export const useDimensions = (targetRef: React.RefObject<HTMLDivElement>) => {
  const getDimensions = () => {
    return {
      width: targetRef.current ? targetRef.current.offsetWidth : 0,
      height: targetRef.current ? targetRef.current.offsetHeight : 0,
    };
  };

  const [dimensions, setDimensions] = useState(getDimensions);

  useLayoutEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const handleResize = () => {
      setDimensions({
        width: target.offsetWidth,
        height: target.offsetHeight,
      });
    };
    handleResize();

    const observer = new ResizeObserver(handleResize);
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetRef]);

  return dimensions;
};

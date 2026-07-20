import { useEffect, useRef, useState, type RefObject } from "react";
import { useDimensions } from "../hooks/useDimensions";
import * as d3 from "d3-delaunay";

type BackgroundProps = {
  children: React.ReactNode;
  siteRef: RefObject<HTMLDivElement>;
};

export function Background({ children, siteRef }: BackgroundProps) {
  const { height, width } = useDimensions(siteRef);
  const [mousePos, setMousePos] = useState([0, 0]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos([event.pageX, event.pageY]);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const seeds = useRef(
    Array.from(
      { length: 150 },
      () => [Math.random(), Math.random()] as [number, number],
    ),
  );

  const particles = seeds.current.map(
    ([x, y]) => [x * width, y * height] as [number, number],
  );

  const delaunay = d3.Delaunay.from([...particles, mousePos] as [
    number,
    number,
  ][]);
  const voronoi = delaunay.voronoi([0, 0, width, height]);

  voronoi.render();
  const voronoiPath = (
    <path
      d={voronoi.render()}
      stroke={"var(--color-accent)"}
      fill={"var(--color-primary)"}
    />
  );

  return (
    <div className="size-full">
      <svg className="absolute bg-primary -z-10" width={width} height={height}>
        {voronoiPath}
      </svg>
      {children}
    </div>
  );
}

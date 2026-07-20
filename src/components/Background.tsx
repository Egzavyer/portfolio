import { useEffect, useRef, type RefObject } from "react";
import { useDimensions } from "../hooks/useDimensions";
import * as d3 from "d3-delaunay";

type BackgroundProps = {
  children: React.ReactNode;
  siteRef: RefObject<HTMLDivElement>;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export function Background({ children, siteRef }: BackgroundProps) {
  const { height, width } = useDimensions(siteRef);

  const pathRef = useRef<SVGPathElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const requestRef = useRef<number | null>(null);

  const particles = useRef<Particle[]>([]);

  const mousePos = useRef<[number, number]>([width / 2, height / 2]);

  const createParticles = () => {
    particles.current = Array.from({ length: 150 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));
  };

  useEffect(() => {
    createParticles();

    const animate = () => {
      for (const particle of particles.current) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;

        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;
      }

      const points: [number, number][] = particles.current.map((p) => [
        p.x,
        p.y,
      ]);

      points.push(mousePos.current);

      const delaunay = d3.Delaunay.from(points);

      const voronoi = delaunay.voronoi([0, 0, width, height]);

      pathRef.current?.setAttribute("d", voronoi.render());

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (event: MouseEvent) => {
      if (!svgRef.current) return;

      mousePos.current = [event.pageX, event.pageY];
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [width, height]);

  return (
    <div className="size-full">
      <svg
        ref={svgRef}
        className="absolute bg-primary -z-10"
        width={width}
        height={height}
      >
        <path
          ref={pathRef}
          stroke="var(--color-accent)"
          fill="var(--color-primary)"
          strokeWidth={2}
        />
      </svg>

      {children}
    </div>
  );
}

import { useEffect, useRef, type RefObject } from "react";
import { useDimensions } from "../hooks/useDimensions";

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
  const hasRenderedRef = useRef(false);

  const particles = useRef<Particle[]>([]);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const mousePos = useRef<[number, number]>([width / 2, height / 2]);

  useEffect(() => {
    const previous = dimensionsRef.current;
    if (
      previous.width > 0 &&
      previous.height > 0 &&
      particles.current.length > 0
    ) {
      const scaleX = width / previous.width;
      const scaleY = height / previous.height;
      for (const particle of particles.current) {
        particle.x *= scaleX;
        particle.y *= scaleY;
      }
      mousePos.current = [
        mousePos.current[0] * scaleX,
        mousePos.current[1] * scaleY,
      ];
    } else {
      mousePos.current = [width / 2, height / 2];
    }
    dimensionsRef.current = { width, height };
  }, [width, height]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const savesData = connection?.saveData === true;
    const isConstrained = hasCoarsePointer || width < 768;
    const particleCount = savesData ? 40 : isConstrained ? 75 : 150;
    const frameInterval = isConstrained ? 1000 / 30 : 0;

    const handlePointerMove = (event: PointerEvent) => {
      if (!svgRef.current) return;

      mousePos.current = [event.pageX, event.pageY];
    };
    let stopped = false;
    let lastFrame = 0;
    let animate: ((time: number) => void) | undefined;

    const startAnimation = () => {
      if (
        stopped ||
        document.hidden ||
        savesData ||
        requestRef.current !== null ||
        !animate
      ) {
        return;
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    const handleVisibilityChange = () => {
      if (document.hidden && requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      } else {
        startAnimation();
      }
    };

    const initialize = async () => {
      const { Delaunay } = await import("d3-delaunay");
      if (stopped) return;

      // Wait until the lazy-loaded sections have established the document
      // height, avoiding a briefly over-dense background in the hero.
      while (
        !stopped &&
        dimensionsRef.current.height < window.innerHeight * 1.5
      ) {
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => resolve()),
        );
      }
      if (stopped) return;

      const random = createSeededRandom(0x06032005);
      const initialDimensions = dimensionsRef.current;
      particles.current = Array.from({ length: particleCount }, () => ({
        x: random() * initialDimensions.width,
        y: random() * initialDimensions.height,
        vx: (random() - 0.5) * 0.5,
        vy: (random() - 0.5) * 0.5,
      }));

      animate = (time: number) => {
        if (stopped) return;
        requestRef.current = null;
        if (document.hidden) return;
        if (frameInterval && time - lastFrame < frameInterval) {
          requestRef.current = requestAnimationFrame(animate!);
          return;
        }
        lastFrame = time;
        const currentDimensions = dimensionsRef.current;
        for (const particle of particles.current) {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < 0) particle.x = currentDimensions.width;
          if (particle.x > currentDimensions.width) particle.x = 0;
          if (particle.y < 0) particle.y = currentDimensions.height;
          if (particle.y > currentDimensions.height) particle.y = 0;
        }

        const points: [number, number][] = particles.current.map((particle) => [
          particle.x,
          particle.y,
        ]);
        points.push(mousePos.current);

        const voronoi = Delaunay.from(points).voronoi([
          0,
          0,
          currentDimensions.width,
          currentDimensions.height,
        ]);
        pathRef.current?.setAttribute("d", voronoi.render());
        if (!hasRenderedRef.current && svgRef.current) {
          hasRenderedRef.current = true;
          svgRef.current.style.opacity = "0.35";
        }
        if (!savesData) {
          requestRef.current = requestAnimationFrame(animate!);
        }
      };

      if (!hasCoarsePointer) {
        window.addEventListener("pointermove", handlePointerMove);
      }
      document.addEventListener("visibilitychange", handleVisibilityChange);
      requestRef.current = requestAnimationFrame(animate);
    };
    void initialize();

    return () => {
      stopped = true;
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
    };
  }, [width]);

  return (
    <div className="relative isolate size-full overflow-x-clip bg-primary">
      <svg
        ref={svgRef}
        className="pointer-events-none absolute inset-0 -z-10 bg-primary opacity-0 transition-opacity duration-1000 ease-out motion-reduce:transition-none"
        width={width}
        height={height}
        aria-hidden="true"
        focusable="false"
      >
        <path
          ref={pathRef}
          stroke="var(--color-accent)"
          fill="var(--color-primary)"
          strokeWidth={1}
        />
      </svg>

      {children}
    </div>
  );
}

function createSeededRandom(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

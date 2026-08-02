import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const EDGE_MARGIN = 12;
const DRAG_THRESHOLD = 5;
const STORAGE_KEY = "floating-toggle-pos";
const DIM_DELAY = 3000;

interface Position {
  x: number;
  y: number;
}

interface DragState {
  pointerId: number;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
  moved: boolean;
}

export function FloatingThemeToggle() {
  const [position, setPosition] = useState<Position | null>(null);
  const [active, setActive] = useState(true);
  const dragRef = useRef<DragState | null>(null);
  const movedRef = useRef(false);
  const dimTimerRef = useRef<number | null>(null);

  const scheduleDim = () => {
    if (dimTimerRef.current !== null) {
      window.clearTimeout(dimTimerRef.current);
    }
    dimTimerRef.current = window.setTimeout(() => {
      setActive(false);
      dimTimerRef.current = null;
    }, DIM_DELAY);
  };

  useEffect(() => {
    scheduleDim();
    return () => {
      if (dimTimerRef.current !== null) {
        window.clearTimeout(dimTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Position;
        if (typeof parsed.x === "number" && typeof parsed.y === "number") {
          setPosition(parsed);
        }
      }
    } catch {
      // saved position tidak valid, abaikan
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setPosition((current) => {
        if (!current) return current;
        const clampX = Math.min(Math.max(current.x, EDGE_MARGIN), window.innerWidth - 48 - EDGE_MARGIN);
        const clampY = Math.min(Math.max(current.y, EDGE_MARGIN), window.innerHeight - 48 - EDGE_MARGIN);
        if (clampX === current.x && clampY === current.y) return current;
        return { x: clampX, y: clampY };
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: rect.left,
      originY: rect.top,
      moved: false,
    };
    movedRef.current = false;
    setActive(true);
    if (dimTimerRef.current !== null) {
      window.clearTimeout(dimTimerRef.current);
      dimTimerRef.current = null;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || event.pointerId !== drag.pointerId) return;

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
      drag.moved = true;
      movedRef.current = true;
    }
    if (!drag.moved) return;

    const width = event.currentTarget.offsetWidth;
    const height = event.currentTarget.offsetHeight;
    setPosition({
      x: Math.min(Math.max(drag.originX + dx, EDGE_MARGIN), window.innerWidth - width - EDGE_MARGIN),
      y: Math.min(Math.max(drag.originY + dy, EDGE_MARGIN), window.innerHeight - height - EDGE_MARGIN),
    });
  };

  const finishDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || event.pointerId !== drag.pointerId) return;
    dragRef.current = null;

    scheduleDim();

    if (!drag.moved) return;

    const width = event.currentTarget.offsetWidth;

    setPosition((current) => {
      if (!current) return current;
      const snapLeft = current.x - EDGE_MARGIN < window.innerWidth - current.x - width - EDGE_MARGIN;
      const snapped: Position = {
        x: snapLeft ? EDGE_MARGIN : window.innerWidth - width - EDGE_MARGIN,
        y: current.y,
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(snapped));
      } catch {
        // penyimpanan gagal, abaikan
      }
      return snapped;
    });
  };

  const handleClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (movedRef.current) {
      event.preventDefault();
      event.stopPropagation();
      movedRef.current = false;
    }
  };

  return (
    <div
      className='glass fixed bottom-20 right-4 z-50 h-12 w-12 cursor-grab touch-none rounded-full p-1.5 shadow-lg backdrop-blur-[24px] backdrop-saturate-[160%] select-none active:cursor-grabbing md:hidden transition-opacity duration-300'
      style={{
        ...(position ? { left: position.x, top: position.y } : {}),
        opacity: active ? 1 : 0.6,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
      onClickCapture={handleClickCapture}
    >
      <ThemeToggle />
    </div>
  );
}

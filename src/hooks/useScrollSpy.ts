import { useEffect, useState } from "react";

export function useScrollSpy(ids: string[], offset = 0.35) {
  const [activeId, setActiveId] = useState(ids[0] ?? "");

  useEffect(() => {
    let rafId = 0;
    const update = () => {
      rafId = 0;
      const scrollTop = window.scrollY;
      const doc = document.documentElement;
      const isAtBottom = window.innerHeight + scrollTop >= doc.scrollHeight - 8;

      if (isAtBottom) {
        const last = ids[ids.length - 1];
        const lastElement = last ? document.getElementById(last) : null;
        if (lastElement) {
          setActiveId((previous) => (previous === last ? previous : last));
          return;
        }
      }

      const line = window.innerHeight * offset;
      let current = ids[0] ?? "";
      for (const id of ids) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (element.getBoundingClientRect().top <= line) current = id;
      }
      setActiveId((previous) => (previous === current ? previous : current));
    };
    const handleScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [ids, offset]);

  return activeId;
}

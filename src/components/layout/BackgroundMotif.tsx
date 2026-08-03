import { useEffect, useRef } from "react";

const LAYERS = [
  { speed: 0.04, className: "top-[-4rem] right-[-3rem] sm:top-[-6rem]" },
  { speed: 0.07, className: "top-[16rem] left-[-7rem]" },
  { speed: -0.04, className: "bottom-[-3rem] left-[-2rem] sm:left-[4rem]" },
  { speed: 0.12, className: "top-[42%] right-[8%]" },
];

export function BackgroundMotif() {
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId = 0;
    const update = () => {
      rafId = 0;
      const y = window.scrollY;
      layerRefs.current.forEach((el, index) => {
        if (el) el.style.transform = `translate3d(0, ${y * LAYERS[index].speed}px, 0)`;
      });
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
  }, []);

  return (
    <div aria-hidden='true' className='pointer-events-none fixed inset-0 -z-10 select-none overflow-hidden'>
      <div
        ref={(el) => {
          layerRefs.current[0] = el;
        }}
        className={`absolute will-change-transform ${LAYERS[0].className}`}
      >
        <span className='block font-mono text-[clamp(10rem,22vw,18rem)] font-semibold leading-none tracking-tighter text-brand-500/5 dark:text-brand-400/5'>
          {"{ }"}
        </span>
      </div>
      <div
        ref={(el) => {
          layerRefs.current[1] = el;
        }}
        className={`absolute will-change-transform ${LAYERS[1].className}`}
      >
        <span className='block size-[clamp(14rem,30vw,26rem)] rounded-full border-[3px] border-brand-300/10 dark:border-brand-400/10' />
      </div>
      <div
        ref={(el) => {
          layerRefs.current[2] = el;
        }}
        className={`absolute will-change-transform ${LAYERS[2].className}`}
      >
        <span className='block font-mono text-[clamp(6rem,14vw,11rem)] font-semibold leading-none tracking-tighter text-green-600/5 dark:text-green-500/5'>
          {"</>"}
        </span>
      </div>
      <div
        ref={(el) => {
          layerRefs.current[3] = el;
        }}
        className={`absolute will-change-transform ${LAYERS[3].className}`}
      >
        <span className='block size-7 rounded-full bg-green-500/15 dark:bg-green-500/20' />
      </div>
    </div>
  );
}

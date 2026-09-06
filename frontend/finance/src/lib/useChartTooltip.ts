import { PointerEvent, useEffect, useRef, useState } from "react";

/** Recharts 2 activates hover on touch-move, but a simple tap needs click mode. */
export function useChartTooltip() {
  const ref = useRef<HTMLDivElement>(null);
  const [trigger, setTrigger] = useState<"hover" | "click">("hover");
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const outside = (event: globalThis.PointerEvent) => {
      if (!event.composedPath().includes(ref.current!)) setDismissed(true);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDismissed(true);
    };
    const dismiss = () => setDismissed(true);
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    document.addEventListener("scroll", dismiss, true);
    window.addEventListener("resize", dismiss);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
      document.removeEventListener("scroll", dismiss, true);
      window.removeEventListener("resize", dismiss);
    };
  }, []);

  const pointer = (event: PointerEvent<HTMLDivElement>) => {
    setTrigger(event.pointerType === "mouse" ? "hover" : "click");
    setDismissed(false);
  };
  return {
    // Remount the tooltip after dismissal to clear Recharts' own Escape latch.
    key: dismissed ? "dismissed" : "active",
    plot: {
      ref,
      onPointerDownCapture: pointer,
      onPointerMoveCapture: (event: PointerEvent<HTMLDivElement>) => {
        if (event.pointerType === "mouse") pointer(event);
      },
      onFocusCapture: () => setDismissed(false),
      onBlurCapture: () => setDismissed(true),
      onKeyDownCapture: (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") setDismissed(false);
      },
    },
    tooltip: { trigger, active: dismissed ? false : undefined },
  };
}

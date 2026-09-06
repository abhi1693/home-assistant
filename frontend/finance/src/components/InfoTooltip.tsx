import { ReactNode, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { Overlay } from "../cards/common";

/** Hover, keyboard and tap access, using the card's existing top-layer overlay. */
export default function InfoTooltip({ label, className, children, content }: {
  label: string; className: string; children: ReactNode; content: ReactNode;
}) {
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const bubble = useRef<HTMLDivElement>(null);
  const pinned = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ left: 12, top: 12 });
  const cancelClose = () => clearTimeout(timer.current);
  const close = () => { cancelClose(); pinned.current = false; setOpen(false); };
  const show = () => { cancelClose(); setOpen(true); };
  const leave = () => { if (!pinned.current) timer.current = setTimeout(close, 160); };

  useLayoutEffect(() => {
    if (!open) return;
    const place = () => {
      if (!trigger.current || !bubble.current) return;
      const anchor = trigger.current.getBoundingClientRect();
      const bounds = bubble.current.getBoundingClientRect();
      const left = Math.max(12, Math.min(anchor.left, window.innerWidth - bounds.width - 12));
      const below = anchor.bottom + 8;
      const top = below + bounds.height <= window.innerHeight - 12
        ? below : Math.max(12, anchor.top - bounds.height - 8);
      setPosition({ left, top });
    };
    place();
    const observer = new ResizeObserver(place);
    if (bubble.current) observer.observe(bubble.current);
    window.addEventListener("resize", place);
    return () => { observer.disconnect(); window.removeEventListener("resize", place); };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      const path = event.composedPath();
      if (!path.includes(trigger.current!) && !path.includes(bubble.current!)) close();
    };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") close(); };
    const scroll = (event: Event) => { if (!event.composedPath().includes(bubble.current!)) close(); };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    document.addEventListener("scroll", scroll, true);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
      document.removeEventListener("scroll", scroll, true);
      cancelClose();
    };
  }, [open]);

  return <>
    <button ref={trigger} type="button" className={className} aria-label={label}
      aria-describedby={open ? id : undefined} aria-expanded={open}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") show(); }}
      onPointerLeave={leave} onFocus={show} onBlur={close}
      onClick={() => { if (pinned.current) close(); else { pinned.current = true; show(); } }}>
      {children}
    </button>
    {open && <Overlay><div ref={bubble} id={id} role="tooltip" className="finance-info-tooltip"
      style={position} onPointerEnter={cancelClose} onPointerLeave={leave}>
      {content}
    </div></Overlay>}
  </>;
}

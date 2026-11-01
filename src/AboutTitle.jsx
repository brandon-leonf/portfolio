import { useEffect, useRef, useState } from "react";

const TITLE = "Beyond the interface._";

export default function AboutTitle() {
  const headingRef = useRef(null);
  const [phase, setPhase] = useState("waiting");
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timers = new Set();
    let started = false;
    const schedule = (callback, delay) => {
      const timer = setTimeout(callback, delay);
      timers.add(timer);
    };
    const finish = () => {
      timers.forEach(clearTimeout);
      setTyped(TITLE);
      setPhase("done");
    };
    const start = () => {
      if (started) return;
      started = true;
      if (motion.matches) { finish(); return; }
      schedule(() => {
        setPhase("typing");
        for (let i = 1; i <= TITLE.length; i++) {
          schedule(() => {
            setTyped(TITLE.slice(0, i));
            if (i === TITLE.length) setPhase("done");
          }, i * 75);
        }
      }, 1100);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { start(); observer.disconnect(); }
    }, { threshold: 0.2 });
    observer.observe(headingRef.current);
    const change = () => { if (motion.matches) finish(); };
    motion.addEventListener("change", change);
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
      motion.removeEventListener("change", change);
    };
  }, []);

  return (
    <h2 ref={headingRef} id="about-title" className={`section-title about-flip-title phase-${phase}`} aria-label="Beyond the interface.">
      <span className="title-size-guide" aria-hidden="true">{TITLE}</span>
      <span className="title-original" aria-hidden="true">ABOUT</span>
      <span className="title-typed" aria-hidden="true">{typed.endsWith("_") ? <>{typed.slice(0, -1)}<span className="title-end-cursor">_</span></> : typed}</span>
    </h2>
  );
}

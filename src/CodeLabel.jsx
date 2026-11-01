import { useEffect, useRef, useState } from "react";

export default function CodeLabel({ text }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer;
    const stop = () => { clearInterval(timer); setDisplay(text); };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (motion.matches) return;
      let iteration = 0;
      const charset = "01_/<>{}ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      timer = setInterval(() => {
        iteration += 0.75;
        setDisplay([...text].map((char, index) =>
          char === " " || index < iteration ? char : charset[Math.floor(Math.random() * charset.length)]
        ).join(""));
        if (iteration >= text.length) stop();
      }, 30);
    }, { threshold: 0.5 });
    observer.observe(ref.current);
    const change = () => { if (motion.matches) stop(); };
    motion.addEventListener("change", change);
    return () => {
      observer.disconnect();
      clearInterval(timer);
      motion.removeEventListener("change", change);
    };
  }, [text]);
  return <span ref={ref} className="project-code-label" aria-label={text}><span aria-hidden="true">{display}</span><span className="project-label-cursor" aria-hidden="true" /></span>;
}

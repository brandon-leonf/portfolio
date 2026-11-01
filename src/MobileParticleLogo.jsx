import { useEffect, useRef, useState } from "react";
import logo from "./assets/logo.png";

export default function MobileParticleLogo() {
  const ref = useRef(null);
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const image = new Image();
    let frame, start, ready = false, visible = false, disposed = false, finished = false;
    const finish = () => {
      if (disposed) return;
      finished = true;
      cancelAnimationFrame(frame);
      setComplete(true);
    };
    const random = (i) => {
      const n = Math.sin(i * 127.1 + 311.7) * 43758.5453;
      return n - Math.floor(n);
    };
    let points = [];
    function draw(time) {
      if (!visible || !ready || finished || document.hidden) return;
      if (motion.matches) { finish(); return; }
      if (start === undefined) start = time;
      const progress = Math.min(1, (time - start) / 1600);
      ctx.clearRect(0, 0, 120, 120);
      points.forEach((p, i) => {
        const t = Math.min(1, Math.max(0, (progress - p.delay) / (1 - p.delay)));
        const ease = 1 - Math.pow(1 - t, 4);
        const x = p.sx + (p.x - p.sx) * ease;
        const y = p.sy + (p.y - p.sy) * ease;
        ctx.globalAlpha = 0.2 + ease * 0.8;
        ctx.fillStyle = i % 19 === 0 ? "#A6C9E7" : p.color;
        ctx.fillRect(x, y, 0.8 + ease * 0.7, 0.8 + ease * 0.7);
      });
      ctx.globalAlpha = 1;
      if (progress < 1) frame = requestAnimationFrame(draw);
      else finish();
    }
    function resume() {
      cancelAnimationFrame(frame);
      if (!finished && visible && ready && !document.hidden) frame = requestAnimationFrame(draw);
    }
    canvas.width = canvas.height = 240;
    ctx.scale(2, 2);
    image.onload = () => {
      if (disposed) return;
      const sample = document.createElement("canvas");
      sample.width = 80;
      sample.height = 86;
      const source = sample.getContext("2d");
      source.drawImage(image, 0, 0, 80, 86);
      const data = source.getImageData(0, 0, 80, 86).data;
      for (let y = 0; y < 86; y += 2) {
        for (let x = 0; x < 80; x += 2) {
          const k = (y * 80 + x) * 4;
          if (data[k + 3] < 100) continue;
          const i = points.length;
          points.push({ x: 37 + x * 0.575, y: 35 + y * 0.575,
            sx: random(i + 1) * 120, sy: random(i + 80) * 120,
            delay: random(i + 150) * 0.2,
            color: `rgb(${data[k]},${data[k + 1]},${data[k + 2]})` });
        }
      }
      ready = true;
      resume();
    };
    image.onerror = finish;
    image.src = logo;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); }, { threshold: 0.5 });
    observer.observe(canvas);
    const change = () => { if (motion.matches) finish(); };
    motion.addEventListener("change", change);
    document.addEventListener("visibilitychange", resume);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      image.onload = image.onerror = null;
      motion.removeEventListener("change", change);
      document.removeEventListener("visibilitychange", resume);
    };
  }, []);
  return <span className={`mobile-particle-mark ${complete ? "is-complete" : ""}`}>
    <canvas ref={ref} aria-hidden="true" />
    <img src={logo} alt="Brandon Leon logo" />
  </span>;
}

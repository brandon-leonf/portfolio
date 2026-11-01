import { useEffect, useRef } from "react";

export default function ProfileParticles() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0, height = 0, frame, visible = false, last = 0;
    const random = (n) => {
      const value = Math.sin(n * 127.1 + 311.7) * 43758.5453;
      return value - Math.floor(value);
    };
    function draw(time) {
      ctx.clearRect(0, 0, width, height);
      const dark = canvas.closest(".page")?.classList.contains("dark");
      const phase = motion.matches ? 0 : time * 0.00015;
      for (let i = 0; i < 65; i++) {
        const depth = random(i + 20);
        const x = ((random(i + 1) + Math.sin(phase * 0.8 + i) * 0.12 + 1) % 1) * width;
        const y = ((random(i + 100) - phase * (0.08 + depth * 0.08) + 100) % 1) * height;
        const size = 0.8 + depth * 1.5;
        ctx.fillStyle = dark ? "#A6C9E7" : "#3269AC";
        ctx.strokeStyle = dark ? "#A6C9E7" : "#3269AC";
        ctx.globalAlpha = 0.14 + depth * 0.2;
        if (i % 6 === 0) {
          ctx.lineWidth = 0.65;
          ctx.strokeRect(x, y, size * 2, size * 2);
        } else {
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    }
    function tick(time) {
      if (time - last > 40) { draw(time); last = time; }
      frame = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame);
      if (!visible || document.hidden) return;
      draw(performance.now());
      if (!motion.matches) frame = requestAnimationFrame(tick);
    }
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      sync();
    });
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    resize.observe(canvas);
    intersection.observe(canvas);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);
  return <canvas className="profile-particles" ref={ref} aria-hidden="true" />;
}

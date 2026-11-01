import { useEffect, useRef, useState } from "react";
import logo from "./assets/logo.png";

export default function ParticlePortrait({ src }) {
  const ref = useRef(null);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const image = new Image();
    let width = 0, height = 0, frame, start;
    let visible = false, finished = false, disposed = false;
    let points = [];
    const random = (n) => {
      const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };
    function finish() {
      if (disposed) return;
      finished = true;
      cancelAnimationFrame(frame);
      setComplete(true);
    }
    function draw(time) {
      if (disposed || finished || !points.length || !visible || document.hidden) return;
      if (motion.matches) { finish(); return; }
      if (start === undefined) start = time;
      const elapsed = time - start;
      const progress = Math.min(1, elapsed / 2400);
      context.clearRect(0, 0, width, height);
      const size = width / 2.2;
      const logoHeight = size * image.naturalHeight / image.naturalWidth;
      const left = (width - size) / 2;
      const top = (height - logoHeight) / 2;
      const metal = context.createLinearGradient(left, top, left + size, top + logoHeight);
      [[0,"#491423"],[0.22,"#B11226"],[0.39,"#EDD1D9"],[0.46,"#7C3449"],
        [0.65,"#B11226"],[0.8,"#E7E5EC"],[1,"#631B30"]]
        .forEach(([stop,color]) => metal.addColorStop(stop,color));
      points.forEach((p, i) => {
        const local = Math.max(0, Math.min(1, (progress - p.delay) / (1 - p.delay)));
        const ease = 1 - Math.pow(1 - local, 4);
        const targetX = left + p.x * size;
        const targetY = top + p.y * logoHeight;
        const x = p.sx * width + (targetX - p.sx * width) * ease;
        const y = p.sy * height + (targetY - p.sy * height) * ease;
        const tile = size / 70 * (0.45 + ease * 0.55);
        context.globalAlpha = 0.2 + local * 0.8;
        context.fillStyle = local > 0.93 ? metal : i % 15 === 0 ? "#3269AC" : "#B11226";
        context.save();
        context.translate(x, y);
        context.rotate((p.angle - 0.5) * (1 - ease) * Math.PI);
        context.fillRect(-tile / 2, -tile / 2, tile, tile);
        context.restore();
      });
      context.globalAlpha = 1;
      // Hold the completed mark briefly before the portrait flip.
      if (elapsed < 3100) frame = requestAnimationFrame(draw);
      else finish();
    }
    function resume() {
      cancelAnimationFrame(frame);
      if (visible && !finished && !document.hidden && points.length) frame = requestAnimationFrame(draw);
    }
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      resume();
    });
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); }, { threshold: 0.25 });
    resize.observe(canvas);
    observer.observe(canvas);
    image.onload = () => {
      if (disposed) return;
      const sample = document.createElement("canvas");
      sample.width = 140;
      sample.height = Math.round(140 * image.naturalHeight / image.naturalWidth);
      const ctx = sample.getContext("2d");
      ctx.drawImage(image, 0, 0, sample.width, sample.height);
      const pixels = ctx.getImageData(0, 0, sample.width, sample.height).data;
      for (let y = 0; y < sample.height; y += 2) {
        for (let x = 0; x < sample.width; x += 2) {
          const offset = (y * sample.width + x) * 4;
          if (pixels[offset + 3] < 100 || pixels[offset] < pixels[offset + 1] * 1.3 || pixels[offset] < 70) continue;
          const i = points.length;
          points.push({ x: x / sample.width, y: y / sample.height,
            sx: random(i + 1), sy: random(i + 100), angle: random(i + 300), delay: random(i + 800) * 0.22 });
        }
      }
      resume();
    };
    image.onerror = finish;
    image.src = logo;
    const change = () => { if (motion.matches) finish(); };
    motion.addEventListener("change", change);
    document.addEventListener("visibilitychange", resume);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      image.onload = image.onerror = null;
      motion.removeEventListener("change", change);
      document.removeEventListener("visibilitychange", resume);
    };
  }, [src]);

  return (
    <div className={`particle-portrait ${complete ? "is-complete" : ""}`}>
      <canvas ref={ref} aria-hidden="true" />
      <img src={src} alt="Portrait of Brandon Leon" width="1066" height="1600" decoding="async" />
    </div>
  );
}

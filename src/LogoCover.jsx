import { useEffect, useRef, useState } from "react";
import logo from "./assets/logo.png";
import CodeLabel from "./CodeLabel";

export default function LogoCover({ onComplete }) {
  const [leaving, setLeaving] = useState(false);
  const completeRef = useRef(onComplete);
  const exitTimer = useRef(null);
  const exiting = useRef(false);
  useEffect(() => { completeRef.current = onComplete; }, [onComplete]);

  function dismissIntro(event) {
    event?.preventDefault();
    if (exiting.current) return;
    exiting.current = true;
    setLeaving(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    exitTimer.current = setTimeout(() => completeRef.current?.(), reduced ? 0 : 650);
  }

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = setTimeout(() => {
      if (exiting.current) return;
      exiting.current = true;
      setLeaving(true);
      exitTimer.current = setTimeout(() => completeRef.current?.(), reduced ? 0 : 650);
    }, reduced ? 800 : 5100);
    return () => { clearTimeout(timer); clearTimeout(exitTimer.current); };
  }, []);
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const picture = new Image();
    let particles = [];
    let width = 0;
    let height = 0;
    let frame;
    let start;
    let lastFrame = 0;
    let visible = true;
    const pointer = { x: -1000, y: -1000, vx: 0, vy: 0, time: 0, active: false };
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let disposed = false;
    const glyphs = ["▪", "+", ":", "/", "#", "."];
    const random = (n) => {
      const value = Math.sin(n * 127.1 + 42) * 43758.5453;
      return value - Math.floor(value);
    };

    function paint(time) {
      if (disposed) return;
      if (start === undefined) start = time;
      const elapsed = time - start;
      const dt = Math.min(2, Math.max(0.25, (time - (lastFrame || time - 16.67)) / 16.67));
      lastFrame = time;
      const pointerEnergy = Math.exp(-Math.max(0, time - pointer.time) / 180);
      context.clearRect(0, 0, width, height);
      const entranceProgress = Math.min(1, Math.max(0, (elapsed - 500) / 3300));
      const bounds = canvas.getBoundingClientRect();
      const scrollProgress = Math.min(1, Math.max(0, -bounds.top / Math.max(height * 0.7, 1)));
      const globalProgress = motion.matches ? 1 : entranceProgress * (1 - scrollProgress);
      const logoSize = Math.min(width * 0.56, height * 0.7, 480);
      const metal = context.createLinearGradient(
        (width - logoSize) / 2, height / 2 - logoSize * 0.35,
        (width + logoSize) / 2, height / 2 + logoSize * 0.35,
      );
      [[0, "#491423"], [0.18, "#941D32"], [0.32, "#D15B6E"],
        [0.39, "#F0D9DF"], [0.44, "#A89CA8"], [0.48, "#631B30"],
        [0.62, "#B11226"], [0.76, "#D47A89"], [0.81, "#E7E5EC"],
        [0.87, "#8E4658"], [1, "#461321"]]
        .forEach(([stop, color]) => metal.addColorStop(stop, color));
      particles.forEach((p, i) => {
        const progress = Math.min(1, Math.max(0, (globalProgress - p.delay) / (1 - p.delay)));
        const ease = 1 - Math.pow(1 - progress, 4);
        const orbit = Math.sin(progress * Math.PI) * 45;
        const x = p.sx + (p.x - p.sx) * ease + Math.sin(i + progress * 5) * orbit;
        const y = p.sy + (p.y - p.sy) * ease + Math.cos(i * 0.7 + progress * 4) * orbit;
        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const distance = Math.hypot(dx, dy);
        const force = pointer.active && !motion.matches ? Math.pow(Math.max(0, 1 - distance / 165), 1.5) * 85 : 0;
        const nx = dx / Math.max(distance, 1);
        const ny = dy / Math.max(distance, 1);
        const swirl = force * 0.32 * p.depth;
        const targetX = nx * force - ny * swirl + pointer.vx * pointerEnergy * force * 0.015;
        const targetY = ny * force + nx * swirl + pointer.vy * pointerEnergy * force * 0.015;
        const previousX = x + p.offsetX;
        const previousY = y + p.offsetY;
        if (motion.matches) {
          p.offsetX = p.offsetY = p.vx = p.vy = 0;
        } else {
          // A damped spring gives each fragment weight and a soft return.
          const steps = Math.ceil(dt);
          const step = dt / steps;
          for (let j = 0; j < steps; j++) {
            p.vx = (p.vx + (targetX - p.offsetX) * 0.045 * step / p.depth) * Math.pow(0.8, step);
            p.vy = (p.vy + (targetY - p.offsetY) * 0.045 * step / p.depth) * Math.pow(0.8, step);
            p.offsetX += p.vx * step;
            p.offsetY += p.vy * step;
          }
        }
        const drawX = x + p.offsetX;
        const drawY = y + p.offsetY;
        const displacement = Math.hypot(p.offsetX, p.offsetY);
        const dispersed = Math.max(1 - ease, Math.min(1, displacement / 65));
        const alpha = (0.2 + ease * 0.8) * (0.72 + p.depth * 0.28);
        const finish = Math.min(1, Math.max(0, (progress - 0.82) / 0.18))
          * Math.max(0, 1 - displacement / 45);
        context.fillStyle = p.color;
        context.strokeStyle = p.color;
        if (displacement > 4 && i % 4 === 0) {
          context.globalAlpha = 0.18;
          context.lineWidth = 0.7;
          context.beginPath();
          context.moveTo(previousX - p.vx * 1.5, previousY - p.vy * 1.5);
          context.lineTo(drawX, drawY);
          context.stroke();
        }
        context.globalAlpha = alpha;
        const size = p.size * (1 - dispersed * 0.35);
        if (dispersed > 0.25 && i % 5 === 0) {
          context.font = `${9 + p.depth * 2}px monospace`;
          context.fillText(glyphs[i % glyphs.length], drawX, drawY);
        } else if (dispersed > 0.2 && i % 4 === 0) {
          context.save();
          context.translate(drawX, drawY);
          context.rotate(p.angle * dispersed + elapsed * 0.00008 * dispersed);
          context.lineWidth = 0.7;
          context.strokeRect(-size / 2, -size / 2, size, size);
          context.restore();
        } else {
          context.fillRect(drawX - size / 2, drawY - size / 2, size, size);
          if (finish > 0) {
            context.globalAlpha = alpha * finish;
            context.fillStyle = metal;
            context.fillRect(drawX - size / 2, drawY - size / 2, size, size);
            // Fine grain and a beveled upper edge catch the light.
            context.globalAlpha = finish * (0.06 + p.grain * 0.1);
            context.fillStyle = p.grain > 0.5 ? "#FFFFFF" : "#170D18";
            context.fillRect(drawX - size / 2, drawY - size * 0.12, size, 0.45);
            context.globalAlpha = finish * 0.18;
            context.fillStyle = "#FFF5F7";
            context.fillRect(drawX - size / 2, drawY - size / 2, size, 0.4);
          }
        }
      });
      context.globalAlpha = 1;
      if (!motion.matches && (entranceProgress < 1 || pointer.active || particles.some((p) => Math.abs(p.offsetX) + Math.abs(p.offsetY) + Math.abs(p.vx) + Math.abs(p.vy) > 0.05)) && visible && !document.hidden) frame = requestAnimationFrame(paint);
    }

    function setup() {
      if (!picture.naturalWidth || disposed) return;
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const sample = document.createElement("canvas");
      sample.width = 170;
      sample.height = Math.round(170 * picture.naturalHeight / picture.naturalWidth);
      const sampler = sample.getContext("2d");
      sampler.drawImage(picture, 0, 0, sample.width, sample.height);
      const data = sampler.getImageData(0, 0, sample.width, sample.height).data;
      const size = Math.min(width * 0.56, height * 0.7, 480);
      const scale = size / sample.width;
      particles = [];
      for (let y = 0; y < sample.height; y += 2) {
        for (let x = 0; x < sample.width; x += 2) {
          const offset = (y * sample.width + x) * 4;
          if (data[offset + 3] < 100 || data[offset] < data[offset + 1] * 1.3 || data[offset] < 70) continue;
          const i = particles.length;
          particles.push({
            x: (width - size) / 2 + x * scale,
            y: (height - sample.height * scale) / 2 + y * scale,
            sx: random(i + 1) * width,
            sy: random(i + 700) * height,
            size: scale * 2.05,
            color: i % 19 === 0 ? "#3269AC" : i % 13 === 0 ? "#941127" : "#B11226",
            depth: 0.7 + random(i + 900) * 0.6,
            grain: random(i + 1200),
            angle: random(i + 150) * Math.PI,
            vx: 0,
            vy: 0,
            delay: random(i + 300) * 0.22,
            offsetX: 0,
            offsetY: 0,
          });
        }
      }
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(paint);
    }
    function resume() {
      cancelAnimationFrame(frame);
      lastFrame = 0;
      if (visible && !document.hidden) frame = requestAnimationFrame(paint);
    }
    const cover = canvas.parentElement;
    function pointerMove(event) {
      if (!finePointer.matches || motion.matches) return;
      const bounds = canvas.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const now = performance.now();
      const delta = Math.max(8, now - pointer.time);
      pointer.vx = pointer.active ? Math.max(-35, Math.min(35, (x - pointer.x) * 16.67 / delta)) : 0;
      pointer.vy = pointer.active ? Math.max(-35, Math.min(35, (y - pointer.y) * 16.67 / delta)) : 0;
      pointer.x = x;
      pointer.y = y;
      pointer.time = now;
      pointer.active = true;
      resume();
    }
    function pointerLeave() {
      pointer.active = false;
      resume();
    }
    cover.addEventListener("pointermove", pointerMove);
    cover.addEventListener("pointerleave", pointerLeave);
    cover.addEventListener("pointercancel", pointerLeave);
    const resize = new ResizeObserver(setup);
    resize.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); });
    intersection.observe(canvas);
    picture.onload = setup;
    picture.src = logo;
    motion.addEventListener("change", resume);
    document.addEventListener("visibilitychange", resume);
    window.addEventListener("scroll", resume, { passive: true });
    return () => {
      disposed = true;
      cover.removeEventListener("pointermove", pointerMove);
      cover.removeEventListener("pointerleave", pointerLeave);
      cover.removeEventListener("pointercancel", pointerLeave);
      picture.onload = null;
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      motion.removeEventListener("change", resume);
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("scroll", resume);
    };
  }, []);

  return (
    <section className={`logo-cover entrance-overlay ${leaving ? "is-leaving" : ""}`} aria-label="Brandon Leon portfolio introduction">
      <div className="cover-grid" aria-hidden="true">
        <span className="cover-grid-number grid-number-start">01</span>
        <span className="cover-grid-number grid-number-center">07</span>
        <span className="cover-grid-number grid-number-end">12</span>
      </div>
      <div className="logo-cover-top"><CodeLabel text="BRANDON LEON" /><CodeLabel text="SOFTWARE · SYSTEMS · DESIGN" /></div>
      <canvas ref={canvasRef} className="logo-cover-canvas" aria-hidden="true" />
      <div className="logo-cover-bottom">
        <p>Ideas into systems.<br /><em>One piece at a time.</em></p>
        <a href="#about" onClick={dismissIntro}>Explore portfolio <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}

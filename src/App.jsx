import "./App.css";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "./assets/logo.png";
import cParserImg from "./assets/C_parcer.png";
import arcadePongImg from "./assets/Arcade_Pong.png";
import arkanoidImg from "./assets/Arcanoid.png";
import brookdaleImg from "./assets/brookdale-community-college.jpg";
import corePanelThumbImg from "./assets/corepanel-thumb.jpg";
import corePanelDemoVideo from "./assets/corepanel-demo.mp4";

const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://bleonflores1.com").replace(/\/$/, "");
const CANONICAL_HOST = import.meta.env.VITE_CANONICAL_HOST || "";
const DEFAULT_ROBOTS = "index,follow";
const ROLE_TEXT = "Developer & Student at NJIT";
const DECODE_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const NIGHT_START_HOUR = 19;
const DAY_START_HOUR = 7;

const ROUTES = [
  { id: "about", label: "ABOUT", index: "01", path: "/about" },
  { id: "education", label: "EDUCATION", index: "02", path: "/education" },
  { id: "experience", label: "EXPERIENCE", index: "03", path: "/experience" },
  { id: "projects", label: "PROJECTS", index: "04", path: "/projects" },
  { id: "contact", label: "CONTACT", index: "05", path: "/contact" },
];
const NAV_LABELS = ROUTES.reduce((acc, section) => {
  acc[section.id] = `${section.index}. ${section.label}`;
  return acc;
}, {});

const ROUTE_META = {
  "/": {
    id: "about",
    title: "Brandon Leon | Developer Portfolio",
    description:
      "Portfolio of Brandon Leon, an NJIT IT student focused on Linux systems, web infrastructure, performance optimization, and reliable deployments.",
  },
  "/about": {
    id: "about",
    title: "About | Brandon Leon",
    description:
      "Learn about Brandon Leon's background, focus areas, and technical skills in web development and software engineering.",
  },
  "/experience": {
    id: "experience",
    title: "Experience | Brandon Leon",
    description:
      "Professional experience of Brandon Leon across web development and design roles.",
  },
  "/education": {
    id: "education",
    title: "Education | Brandon Leon",
    description:
      "Academic background of Brandon Leon in Information Technology and Computer Science.",
  },
  "/projects": {
    id: "projects",
    title: "Projects | Brandon Leon",
    description:
      "Explore software and game development projects by Brandon Leon, including compilers and Unity-based builds.",
  },
  "/contact": {
    id: "contact",
    title: "Contact | Brandon Leon",
    description:
      "Contact Brandon Leon about internships and entry-level opportunities in cloud, systems, and web infrastructure.",
  },
  "/404": {
    id: "notfound",
    title: "404 | Page Not Found",
    description: "The requested page could not be found.",
    robots: "noindex,nofollow",
  },
};

const EXPERIENCE = [
  {
    range: "2023 – Present",
    org: "Industry Media",
    title: "Web Developer / Web Designer",
    body:
      "Develop and maintain wordpress sites, ensure speed, hosting reliability, implement SEO. Diagnose and resolve server-level bottlenecks affecting load times and responsiveness. Investigate and mitigate performance issues caused by plugin conflicts, excessive scripts, and inefficient configurations. implement structured data schema markup and optimize asset delivery. Perform file-level edits via SFTP in live environments and manage plugin/core updates. Contribute to maintaining 99.9% uptime across client websites",
    tags: [
      "WORDPRESS",
      "SFTP",
      "TECHNICAL SEO",
      "PERFORMANCE OPTIMIZATION",
    ],
  },
  {
    range: "2022 — 2023",
    org: "Web Services Group",
    title: "Web Designer",
    body:
      "Created responsive websites and marketing pages with a focus on clean layouts and conversion.",
    tags: ["Web Design", "HTML/CSS", "SEO"],
  },
];

const EDUCATION = [
  {
    range: "2023 — 2026",
    org: "New Jersey Institute of Technology",
    title: "B.S. in Computer Science (Network Specialization)",
    body: "Relevant Coursework:",
    tags: [
      "OPERATING SYSTEMS",
      "COMPUTER NETWORKS",
      "DATABASE SYSTEM DESIGN",
      "PROGRAMMING LANGUAGE CONCEPTS",
      "DATA STRUCTURES",
      "FOUNDATIONS OF COMPUTER SCIENCE",
      "PROBABILITY & STATISTICS",
    ],
  },
  {
    range: "2019 — 2022",
    org: "Brookdale Community College",
    title: "A.S. in Computer Science",
    body: "Relevant Coursework:",
    tags: [
      "DATA STRUCTURES",
      "OBJECT-ORIENTED PROGRAMMING",
      "DISCRETE MATHEMATICS",
      "CALCULUS I & II",
    ],
  },
];

const PROJECTS = [
  {
    name: "CorePanel - Secure Business Dashboard",
    date: "2/27/2026",
    body:
      "CorePanel is a project that I implemented, it has a full featured admin and client dashboard system with CRUD functionality for users, projects, images, PDF's and receipts. It has CSRF protection, activity logging, and is deployed on SiteGround hosting.",
    tags: ["PHP", "MYSQL", "CSS", "SITEGROUND", "AUTHENTICATION"],
    link: "https://github.com/brandon-leonf/CorePanel",
    image: corePanelThumbImg,
    video: corePanelDemoVideo,
  },
  {
    name: "Mini C-Like (MCL) Programming Language",
    date: "11/16/2024",
    body:
      "Designed and implemented a recursive-descent compiler in C++ that performs lexical analysis, syntax parsing, semantic validation, and runtime execution.",
    tags: ["COMPILERS", "C++", "SYSTEMS PROGRAMMING"],
    link: "https://github.com/brandon-leonf/mini-c",
    image: cParserImg,
  },
  {
    name: "Arcade Pong",
    date: "3/16/2021",
    body:
      "A Unity-built arcade pong experience with a clean UI and responsive gameplay.",
    tags: ["Unity", "Game Dev", "C#"],
    link: "https://bleonn.itch.io/ping-pong",
    image: arcadePongImg,
  },
  {
    name: "Arkanoid",
    date: "5/8/2022",
    body:
      "A retro-inspired Arkanoid build with crisp visuals and responsive controls.",
    tags: ["Unity", "Game Dev", "C#"],
    link: "https://bleonn.itch.io/arkanoid",
    image: arkanoidImg,
  },
];

const CONTACT = [
  { label: "Email", value: "leonfloresbrandon@gmail.com" },
  { label: "Location", value: "New Jersey, USA" },
];

function upsertMeta(selector, attrName, attrValue, content) {
  let meta = document.head.querySelector(selector);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attrName, attrValue);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

function upsertCanonical(url) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

function upsertSchema(schemaObject) {
  let script = document.head.querySelector('script[data-schema="route"]');
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema", "route");
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schemaObject);
}

function buildSchema(pathname, canonicalUrl) {
  const routeMeta = ROUTE_META[pathname] || ROUTE_META["/404"];
  const pageName = routeMeta.title;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Brandon Leon",
    url: SITE_URL,
    email: "mailto:leonfloresbrandon@gmail.com",
    jobTitle: "Web Developer",
    sameAs: [
      "https://github.com/brandon-leonf",
      "https://www.linkedin.com/in/brandonleonflores",
    ],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Brandon Leon Portfolio",
    url: SITE_URL,
    sameAs: [
      "https://github.com/brandon-leonf",
      "https://www.linkedin.com/in/brandonleonflores",
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": routeMeta.id === "contact" ? "ContactPage" : "WebPage",
    name: pageName,
    url: canonicalUrl,
    isPartOf: {
      "@type": "WebSite",
      name: "Brandon Leon Portfolio",
      url: SITE_URL,
    },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [webSiteSchema, personSchema, webPageSchema],
  };
}

function shouldUseDarkModeByTime(now = new Date()) {
  const hour = now.getHours();
  return hour >= NIGHT_START_HOUR || hour < DAY_START_HOUR;
}

function normalizePathname(pathname) {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed || "/";
}

function App() {
  const { pathname } = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(() => shouldUseDarkModeByTime());
  const [isLogoAnimating, setIsLogoAnimating] = useState(false);
  const [isDegreePreviewOpen, setIsDegreePreviewOpen] = useState(false);
  const [activeProjectVideo, setActiveProjectVideo] = useState(null);
  const [roleText, setRoleText] = useState(ROLE_TEXT);
  const [navDecodeText, setNavDecodeText] = useState(NAV_LABELS);
  const hasMounted = useRef(false);
  const backgroundVideoRefs = useRef([]);
  const energyCanvasRef = useRef(null);
  const projectVideoRef = useRef(null);

  const normalizedPathname = normalizePathname(pathname);
  const isKnownRoute = Object.hasOwn(ROUTE_META, normalizedPathname);
  const seoPath = isKnownRoute ? normalizedPathname : "/404";
  const activeRouteMeta = ROUTE_META[seoPath];
  const activeSectionId = activeRouteMeta.id;
  const activeSection = ROUTES.find((section) => section.id === activeSectionId);
  const canonicalUrl = `${SITE_URL}${seoPath === "/" ? "/" : seoPath}`;

  useEffect(() => {
    const title = activeRouteMeta.title;
    const description = activeRouteMeta.description;
    const robots = activeRouteMeta.robots || DEFAULT_ROBOTS;

    document.title = title;
    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[name="robots"]', "name", "robots", robots);
    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:type"]', "property", "og:type", "website");
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    upsertMeta('meta[property="og:image"]', "property", "og:image", `${SITE_URL}/og.png`);
    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", `${SITE_URL}/og.png`);
    upsertCanonical(canonicalUrl);
    upsertSchema(buildSchema(seoPath, canonicalUrl));
    document.dispatchEvent(new Event("route-seo-ready"));
  }, [activeRouteMeta.description, activeRouteMeta.robots, activeRouteMeta.title, canonicalUrl, seoPath]);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    setIsLogoAnimating(true);
    const timeoutId = setTimeout(() => setIsLogoAnimating(false), 500);
    return () => clearTimeout(timeoutId);
  }, [isDarkMode]);

  useEffect(() => {
    let iteration = 0;
    const intervalId = setInterval(() => {
      setRoleText(
        ROLE_TEXT.split("")
          .map((char, index) => {
            if (!/[A-Za-z0-9]/.test(char)) {
              return char;
            }

            if (index < iteration) {
              return ROLE_TEXT[index];
            }

            return DECODE_CHARSET[Math.floor(Math.random() * DECODE_CHARSET.length)];
          })
          .join(""),
      );

      iteration += 0.8;
      if (iteration >= ROLE_TEXT.length) {
        clearInterval(intervalId);
        setRoleText(ROLE_TEXT);
      }
    }, 40);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalIds = [];
    const timeoutIds = [];

    ROUTES.forEach((section, sectionIndex) => {
      const targetText = NAV_LABELS[section.id];
      let iteration = 0;

      const timeoutId = setTimeout(() => {
        const intervalId = setInterval(() => {
          const decoded = targetText
            .split("")
            .map((char, index) => {
              if (!/[A-Za-z0-9]/.test(char)) {
                return char;
              }

              if (index < iteration) {
                return targetText[index];
              }

              return DECODE_CHARSET[Math.floor(Math.random() * DECODE_CHARSET.length)];
            })
            .join("");

          setNavDecodeText((previous) => ({
            ...previous,
            [section.id]: decoded,
          }));

          iteration += 1;

          if (iteration >= targetText.length) {
            clearInterval(intervalId);
            setNavDecodeText((previous) => ({
              ...previous,
              [section.id]: targetText,
            }));
          }
        }, 35);

        intervalIds.push(intervalId);
      }, sectionIndex * 90);

      timeoutIds.push(timeoutId);
    });

    return () => {
      intervalIds.forEach((id) => clearInterval(id));
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, []);

  const handleContactSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const honeypotValue = form.elements.company?.value?.trim();

    if (honeypotValue) {
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();

    const subject = encodeURIComponent(`Portfolio Contact Form - ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    );

    window.location.href = `mailto:leonfloresbrandon@gmail.com?subject=${subject}&body=${body}`;
  };

  useEffect(() => {
    const { hostname, protocol, pathname: pathName, search, hash } = window.location;
    const isLocalHost =
      hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";

    if (isLocalHost) return;

    if (protocol === "http:") {
      window.location.replace(`https://${hostname}${pathName}${search}${hash}`);
      return;
    }

    if (CANONICAL_HOST && hostname !== CANONICAL_HOST) {
      window.location.replace(`https://${CANONICAL_HOST}${pathName}${search}${hash}`);
    }
  }, []);

  useEffect(() => {
    if (!isDarkMode) {
      return;
    }

    let frameId = 0;
    const mediaListeners = [];

    const enforceVideoPlayback = (video) => {
      if (!video) return;

      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      video.autoplay = true;
      video.playsInline = true;
      video.disablePictureInPicture = true;
      video.controls = false;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");

      if (video.paused || video.ended) {
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => {});
        }
      }
    };

    const playAllVideos = () => {
      backgroundVideoRefs.current.forEach((video) => {
        enforceVideoPlayback(video);
      });
    };

    const queuePlayback = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      frameId = requestAnimationFrame(() => {
        playAllVideos();
      });
    };

    const handlePlaybackContextChange = () => {
      if (document.visibilityState === "visible") {
        queuePlayback();
      }
    };

    queuePlayback();

    const heartbeatId = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        playAllVideos();
      }
    }, 1500);

    document.addEventListener("visibilitychange", handlePlaybackContextChange);
    window.addEventListener("focus", handlePlaybackContextChange);
    window.addEventListener("pageshow", handlePlaybackContextChange);

    backgroundVideoRefs.current.forEach((video) => {
      if (!video) return;

      const replay = () => {
        queuePlayback();
      };

      ["pause", "ended", "stalled", "waiting", "canplay"].forEach((eventName) => {
        video.addEventListener(eventName, replay);
        mediaListeners.push({ video, eventName, replay });
      });
    });

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      window.clearInterval(heartbeatId);
      document.removeEventListener("visibilitychange", handlePlaybackContextChange);
      window.removeEventListener("focus", handlePlaybackContextChange);
      window.removeEventListener("pageshow", handlePlaybackContextChange);
      mediaListeners.forEach(({ video, eventName, replay }) => {
        video.removeEventListener(eventName, replay);
      });
    };
  }, [isDarkMode]);

  useEffect(() => {
    if (!activeProjectVideo) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveProjectVideo(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProjectVideo]);

  useEffect(() => {
    if (!activeProjectVideo || !projectVideoRef.current) {
      return;
    }

    const videoElement = projectVideoRef.current;
    videoElement.currentTime = 0;
    const playPromise = videoElement.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
  }, [activeProjectVideo]);

  useEffect(() => {
    const canvas = energyCanvasRef.current;
    if (!canvas) return;
    if (isDarkMode) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReducedMotion.matches) {
      return;
    }
    if (window.matchMedia("(max-width: 1024px)").matches) {
      return;
    }

    let frameId = 0;
    let width = 1;
    let height = 1;
    let dpr = 1;
    let sceneWidth = 1;
    let sceneHeight = 1;
    let sceneScale = 1;
    let sceneOffsetX = 0;
    let sceneOffsetY = 0;
    let visibleBandWidth = 1;
    let visibleBandHeight = 1;
    let isMobileViewport = false;
    let isTabletOrMobile = false;
    let lastTime = performance.now();
    let lastMoveTime = 0;

    const pointer = {
      x: width * 0.5,
      y: height * 0.5,
      speed: 0,
      fastEnergy: 0,
      isActive: false,
    };

    let nodes = [];

    const resolveBandMetrics = () => {
      const maxBandTop = Math.max(0, height - 120);
      const canvasRect = canvas.getBoundingClientRect();

      if (isTabletOrMobile) {
        const socials = document.querySelector(".socials");
        if (!(socials instanceof HTMLElement)) {
          return { left: 0, top: height, bandWidth: 0, bandHeight: 0 };
        }

        const rect = socials.getBoundingClientRect();
        if (
          rect.right <= canvasRect.left ||
          rect.left >= canvasRect.right ||
          rect.bottom <= canvasRect.top ||
          rect.top >= canvasRect.bottom
        ) {
          return { left: 0, top: height, bandWidth: 0, bandHeight: 0 };
        }

        const clampedLeft = Math.max(0, Math.min(width, Math.round(rect.left - canvasRect.left)));
        const clampedRight = Math.max(clampedLeft, Math.min(width, Math.round(rect.right - canvasRect.left)));
        const clampedTop = Math.max(0, Math.min(height, Math.round(rect.top - canvasRect.top)));
        const clampedBottom = Math.max(clampedTop, Math.min(height, Math.round(rect.bottom - canvasRect.top)));
        return {
          left: clampedLeft,
          top: clampedTop,
          bandWidth: Math.max(0, clampedRight - clampedLeft),
          bandHeight: Math.max(0, clampedBottom - clampedTop),
        };
      }

      const preferredTop = Math.round(height * 0.74);
      const minTop = Math.round(height * 0.6);
      const top = Math.min(maxBandTop, Math.max(minTop, preferredTop));
      return { left: 0, top, bandWidth: width, bandHeight: Math.max(120, height - top) };
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 3);
      width = window.innerWidth;
      height = window.innerHeight;
      isMobileViewport = width <= 768;
      isTabletOrMobile = width <= 1024;
      sceneScale = isTabletOrMobile ? (isMobileViewport ? 0.58 : 0.64) : 1;
      const band = resolveBandMetrics();
      sceneOffsetX = band.left;
      sceneOffsetY = band.top;
      visibleBandWidth = band.bandWidth;
      visibleBandHeight = band.bandHeight;
      sceneWidth = visibleBandWidth > 0 ? visibleBandWidth / sceneScale : 1;
      sceneHeight = visibleBandHeight > 0 ? visibleBandHeight / sceneScale : 1;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const minNodes = isTabletOrMobile
        ? Math.max(8, Math.round(((visibleBandWidth * visibleBandHeight) / Math.max(width * height, 1)) * 72))
        : 52;
      const nodeCount =
        visibleBandWidth > 0 && visibleBandHeight > 0
          ? Math.round(Math.min(130, Math.max(minNodes, (sceneWidth * sceneHeight) / 16500)))
          : 0;
      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * sceneWidth,
        y: Math.random() * sceneHeight,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        pulse: Math.random() * Math.PI * 2,
      }));

      if (!pointer.isActive) {
        pointer.x = sceneWidth * 0.5;
        pointer.y = sceneHeight * 0.5;
      }
    };

    const refreshBandForTouchLayouts = () => {
      if (!isTabletOrMobile) return;

      const band = resolveBandMetrics();
      if (
        band.left === sceneOffsetX &&
        band.top === sceneOffsetY &&
        band.bandWidth === visibleBandWidth &&
        band.bandHeight === visibleBandHeight
      ) {
        return;
      }

      const previousSceneWidth = sceneWidth;
      const previousSceneHeight = sceneHeight;
      sceneOffsetX = band.left;
      sceneOffsetY = band.top;
      visibleBandWidth = band.bandWidth;
      visibleBandHeight = band.bandHeight;
      sceneWidth = visibleBandWidth > 0 ? visibleBandWidth / sceneScale : 1;
      sceneHeight = visibleBandHeight > 0 ? visibleBandHeight / sceneScale : 1;

      if (previousSceneWidth > 0 && previousSceneHeight > 0) {
        const scaleX = sceneWidth / previousSceneWidth;
        const scaleY = sceneHeight / previousSceneHeight;
        nodes.forEach((node) => {
          node.x *= scaleX;
          node.y *= scaleY;
          if (node.x < -30) node.x = sceneWidth + 30;
          if (node.x > sceneWidth + 30) node.x = -30;
          if (node.y < -30) node.y = sceneHeight + 30;
          if (node.y > sceneHeight + 30) node.y = -30;
        });
      }

      if (!pointer.isActive) {
        pointer.x = sceneWidth * 0.5;
        pointer.y = sceneHeight * 0.5;
      }
    };

    const updatePointer = (clientX, clientY, now) => {
      if (visibleBandWidth <= 0 || visibleBandHeight <= 0) {
        pointer.isActive = false;
        pointer.speed = 0;
        return;
      }

      if (
        clientX < sceneOffsetX ||
        clientX > sceneOffsetX + visibleBandWidth ||
        clientY < sceneOffsetY ||
        clientY > sceneOffsetY + visibleBandHeight
      ) {
        pointer.isActive = false;
        pointer.speed = 0;
        return;
      }

      const x = Math.min(Math.max((clientX - sceneOffsetX) / sceneScale, 0), sceneWidth);
      const y = Math.min(Math.max((clientY - sceneOffsetY) / sceneScale, 0), sceneHeight);
      const elapsed = Math.max(8, now - lastMoveTime);
      const dist = Math.hypot(x - pointer.x, y - pointer.y);
      const pxPerMs = dist / elapsed;

      pointer.x = x;
      pointer.y = y;
      pointer.speed = pxPerMs;
      if (pxPerMs > 1.15) {
        pointer.fastEnergy = Math.min(1, pointer.fastEnergy + 0.16 + Math.min(pxPerMs, 2.4) * 0.045);
      }
      pointer.isActive = true;
      lastMoveTime = now;
    };

    const handleMouseMove = (event) => {
      updatePointer(event.clientX, event.clientY, performance.now());
    };

    const handleTouchMove = (event) => {
      if (!event.touches[0]) return;
      updatePointer(event.touches[0].clientX, event.touches[0].clientY, performance.now());
    };

    const resetPointer = () => {
      pointer.isActive = false;
      pointer.speed = 0;
    };

    const drawFrame = (timestamp) => {
      const time = timestamp * 0.001;
      const delta = Math.min(48, timestamp - lastTime);
      lastTime = timestamp;

      refreshBandForTouchLayouts();
      pointer.fastEnergy = Math.max(0, pointer.fastEnergy - delta * 0.0024);
      const burst = pointer.fastEnergy > 0.22;

      context.clearRect(0, 0, width, height);
      if (visibleBandWidth <= 0 || visibleBandHeight <= 0) {
        frameId = requestAnimationFrame(drawFrame);
        return;
      }

      context.save();
      context.beginPath();
      context.rect(sceneOffsetX, sceneOffsetY, visibleBandWidth, visibleBandHeight);
      context.clip();
      context.translate(sceneOffsetX + visibleBandWidth * 0.5, sceneOffsetY + visibleBandHeight * 0.5);
      context.scale(sceneScale, sceneScale);
      context.translate(-sceneWidth * 0.5, -sceneHeight * 0.5);

      const interactionRadius = (
        isTabletOrMobile
          ? Math.min(90, Math.max(34, Math.min(visibleBandWidth, visibleBandHeight) * 0.56))
          : Math.min(240, Math.max(160, Math.min(width, visibleBandHeight) * 0.28))
      ) / sceneScale;

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.013;

        if (node.x < -30) node.x = sceneWidth + 30;
        if (node.x > sceneWidth + 30) node.x = -30;
        if (node.y < -30) node.y = sceneHeight + 30;
        if (node.y > sceneHeight + 30) node.y = -30;

        if (burst && pointer.isActive) {
          const dx = node.x - pointer.x;
          const dy = node.y - pointer.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < interactionRadius) {
            const force = (1 - dist / interactionRadius) * (0.92 + pointer.fastEnergy * 1.05);
            node.vx += (dx / dist) * force * 0.085;
            node.vy += (dy / dist) * force * 0.085;
          }
        }

        node.vx *= 0.992;
        node.vy *= 0.992;
        const maxSpeed = 0.85 + pointer.fastEnergy * 0.45;
        const speed = Math.hypot(node.vx, node.vy);
        if (speed > maxSpeed) {
          node.vx = (node.vx / speed) * maxSpeed;
          node.vy = (node.vy / speed) * maxSpeed;
        }
      }

      const linkDistance = (
        isTabletOrMobile
          ? Math.min(80, Math.max(26, Math.min(visibleBandWidth, visibleBandHeight) * 0.46))
          : Math.min(180, Math.max(110, Math.min(width, visibleBandHeight) * 0.24))
      ) / sceneScale;
      context.lineWidth = isTabletOrMobile ? 1 : 1;

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > linkDistance) continue;

          let alpha = (1 - dist / linkDistance) * 0.42;
          if (burst && pointer.isActive) {
            const midpointX = (a.x + b.x) * 0.5;
            const midpointY = (a.y + b.y) * 0.5;
            const cursorDist = Math.hypot(midpointX - pointer.x, midpointY - pointer.y);
            if (cursorDist < interactionRadius * 1.2) {
              alpha += (1 - cursorDist / (interactionRadius * 1.2)) * 0.5 * pointer.fastEnergy;
            }
          }

          context.strokeStyle = `rgba(20, 64, 130, ${Math.min(isTabletOrMobile ? 0.9 : 0.88, alpha)})`;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        const coreAlpha = 0.42 + (Math.sin(time * 1.7 + node.pulse) + 1) * 0.14;
        context.fillStyle = `rgba(18, 62, 126, ${coreAlpha})`;
        context.beginPath();
        context.arc(node.x, node.y, isTabletOrMobile ? 1.2 : 1.55, 0, Math.PI * 2);
        context.fill();

      }

      context.restore();
      frameId = requestAnimationFrame(drawFrame);
    };

    resize();
    frameId = requestAnimationFrame(drawFrame);

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", refreshBandForTouchLayouts, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", resetPointer);
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", resetPointer, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", refreshBandForTouchLayouts);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", resetPointer);
      window.removeEventListener("touchstart", handleTouchMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", resetPointer);
    };
  }, [isDarkMode]);

  return (
    <div className={`page ${isDarkMode ? "dark" : ""} ${isLogoAnimating ? "logo-animating" : ""}`}>
      {isDarkMode && (
        <div className="video-background" aria-hidden="true">
          <video
            className="video-background__clip video-background__clip--left"
            ref={(element) => {
              backgroundVideoRefs.current[0] = element;
            }}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="/videos/video4.mp4" type="video/mp4" />
          </video>
          <video
            className="video-background__clip video-background__clip--right"
            ref={(element) => {
              backgroundVideoRefs.current[1] = element;
            }}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="/videos/video-6.mp4" type="video/mp4" />
          </video>
          <div className="video-background__overlay" />
        </div>
      )}
      <canvas ref={energyCanvasRef} className="interactive-energy" aria-hidden="true" />
      <main className="resume">
        <aside className="left">
          <div className="brand">
            <div className="logo">
              <img src={logo} alt="Brandon Leon logo" />
            </div>
            <div className="identity">
              <h1>Brandon Leon</h1>
              <p className="role" aria-label={ROLE_TEXT}>
                {roleText}
              </p>
            </div>
          </div>

          <p className="intro">
            Hi, I&apos;m Brandon Leon. I hold an{" "}
            <span
              className={`degree-preview-wrap ${isDegreePreviewOpen ? "open" : ""}`}
              onMouseEnter={() => setIsDegreePreviewOpen(true)}
              onMouseLeave={() => setIsDegreePreviewOpen(false)}
            >
              <button
                type="button"
                className="degree-preview-trigger"
                aria-expanded={isDegreePreviewOpen}
                aria-label="Show Brookdale Community College image"
                onClick={() => setIsDegreePreviewOpen((prev) => !prev)}
              >
                Associate&apos;s in Computer Science
              </button>
              <span className="degree-preview" role="tooltip">
                <img
                  src={brookdaleImg}
                  alt="brookdale community college in lincroft NJ"
                  loading="lazy"
                  decoding="async"
                />
              </span>
            </span>{" "}
            and am currently completing my Bachelor&apos;s in Information
            Technology at NJIT.
          </p>

          <label className="theme-toggle">
            <span>Dark Mode</span>
            <input
              type="checkbox"
              role="switch"
              aria-label="Toggle dark mode"
              checked={isDarkMode}
              onChange={(event) => setIsDarkMode(event.target.checked)}
            />
          </label>

          <div className="section-labels" role="tablist" aria-label="Sections">
            {ROUTES.map((section) => (
              <NavLink
                key={section.id}
                to={section.path}
                className="section-link"
                role="tab"
                aria-selected={activeSectionId === section.id}
              >
                {navDecodeText[section.id]}
              </NavLink>
            ))}
          </div>

          <div className="socials">
            <a aria-label="GitHub" href="https://github.com/brandon-leonf" className="social">
              <i className="bi bi-github" aria-hidden="true" />
            </a>
            <a
              aria-label="LinkedIn"
              href="https://www.linkedin.com/in/brandonleonflores"
              className="social"
            >
              <i className="bi bi-linkedin" aria-hidden="true" />
            </a>
          </div>
        </aside>

        <section className="right">
          <header className="section-header">
            {activeSectionId === "notfound" ? (
              <>
                <span className="section-kicker">404. PAGE NOT FOUND</span>
                <h2 className="section-title">PAGE NOT FOUND</h2>
              </>
            ) : (
              <>
                <span className="section-kicker">
                  {activeSection?.index}. {activeSection?.label}
                </span>
                <h2 className="section-title">{activeSection?.label}</h2>
              </>
            )}
          </header>

          {activeSectionId === "notfound" && (
            <div className="contact" role="tabpanel">
              <p className="summary">
                The page you requested does not exist. Use the navigation to
                continue browsing this portfolio.
              </p>
            </div>
          )}

          {activeSectionId === "about" && (
            <div className="about" role="tabpanel">
              <p className="summary">
                I am an Information Technology student at the New Jersey
                Institute of Technology (NJIT) with a focused interest in cloud
                infrastructure and network systems.
              </p>
              <p className="summary">
                Currently, I work at Industry Media, where I develop and
                maintain websites that are fully responsive, SEO-optimized
                across digital platforms. Balancing school and work, I
                developed a foundational understanding of TCP/IP, DNS, SSL/TLS,
                and performance bottlenecks on websites -- essential components
                of modern web applications.
              </p>
              <p className="summary">
                In addition, I have experience with Bash scripting, Git version
                control, and backend programming primarily in Java. My approach
                to engineering extends beyond building applications -- I
                prioritize understanding how systems are built, deployed, and
                optimized.
              </p>
              <p className="summary">
                As AI continues to accelerate software development, I believe it
                is increasingly important to understand the underlying systems,
                network architecture, and implementation details that power
                scalable and secure applications.
              </p>
              <p className="summary">
                I am actively pursuing opportunities in{" "}
                <u>Cloud Engineering</u>, <u>Network Engineering</u>, and{" "}
                <u>DevOps</u>, where I can contribute to building reliable and
                high-performance systems.
              </p>
              <div className="about-grid">
                <div>
                  <h3 className="tag-group-heading">Focus</h3>
                  <div className="tags">
                    {[
                      "Linux Systems",
                      "Web Infrastructure",
                      "Networking",
                      "Fundamentals (TCP/IP, DNS)",
                      "Server Configuration",
                      "Performance Optimization",
                      "Scripting & Automation",
                      "Database Fundamentals",
                      "Systems Reliability",
                    ].map((tag) => (
                      <span key={tag} tabIndex={0}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="tag-group-heading">Tools</h3>
                  <div className="tags">
                    {[
                      "Linux",
                      "Bash",
                      "git",
                      "wordpress",
                      "Apache",
                      "FileZilla",
                      "Mysql",
                      "Java",
                      "Python",
                      "PHP",
                      "DNS & SSL configuration",
                      "TCP/IP Fundamentals",
                    ].map((tag) => (
                      <span key={tag} tabIndex={0}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSectionId === "experience" && (
            <div className="experience" role="tabpanel">
              {EXPERIENCE.map((item) => (
                <article className="xp-item" key={`${item.org}-${item.range}`}>
                  <div className="xp-time">{item.range}</div>
                  <div className="xp-body">
                    <h3>{item.org}</h3>
                    <p className="xp-title">{item.title}</p>
                    {item.body === "Relevant Coursework:" ? (
                      <h3 className="tag-group-heading">{item.body}</h3>
                    ) : (
                      item.body && <p>{item.body}</p>
                    )}
                    <div className="tags">
                      {item.tags.map((tag) => (
                        <span key={tag} tabIndex={0}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {activeSectionId === "education" && (
            <div className="experience education" role="tabpanel">
              {EDUCATION.map((item) => (
                <article className="xp-item" key={`${item.org}-${item.range}`}>
                  <div className="xp-time">{item.range}</div>
                  <div className="xp-body">
                    <h3>{item.org}</h3>
                    <p className="xp-title">{item.title}</p>
                    {item.body === "Relevant Coursework:" ? (
                      <h3 className="tag-group-heading">{item.body}</h3>
                    ) : (
                      item.body && <p>{item.body}</p>
                    )}
                    <div className="tags">
                      {item.tags.map((tag) => (
                        <span key={tag} tabIndex={0}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {activeSectionId === "projects" && (
            <div className="projects" role="tabpanel">
              {PROJECTS.map((project) => (
                <article className="project" key={project.name}>
                  {project.link ? (
                    <a
                      className="project-thumb link"
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.name} link`}
                    >
                      {project.image && (
                        <img
                          src={project.image}
                          alt={project.name}
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                      <span className="project-date">{project.date}</span>
                      <span className="project-cta">View Project</span>
                    </a>
                  ) : (
                    <div className="project-thumb" aria-hidden="true">
                      {project.image && (
                        <img
                          src={project.image}
                          alt={project.name}
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                      <span className="project-date">{project.date}</span>
                    </div>
                  )}
                  <div className="project-body">
                    <h4 className="project-title-row">
                      {project.link ? (
                        <a href={project.link} target="_blank" rel="noreferrer">
                          {project.name}
                        </a>
                      ) : (
                        project.name
                      )}
                      {project.video ? (
                        <button
                          type="button"
                          className="project-video-button"
                          aria-label={`Open demo video for ${project.name}`}
                          onClick={() => setActiveProjectVideo(project)}
                        >
                          <i className="bi bi-play-circle-fill" aria-hidden="true" />
                        </button>
                      ) : null}
                    </h4>
                    <p>{project.body}</p>
                    <div className="tags">
                      {project.tags.map((tag) => (
                        <span key={tag} tabIndex={0}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {activeSectionId === "contact" && (
            <div className="contact" role="tabpanel">
              <h4 className="summary">
                Open to opportunities in Cloud Engineering, Systems, and
                DevOps. Feel free to reach out.
              </h4>
              <div className="contact-card">
                {CONTACT.map((item) => (
                  <div key={item.label} className="contact-row">
                    <span>{item.label}</span>
                    <strong>
                      {item.label === "Email" ? (
                        <a href="mailto:leonfloresbrandon@gmail.com">{item.value}</a>
                      ) : (
                        item.value
                      )}
                    </strong>
                  </div>
                ))}
                <div className="contact-links" aria-label="Social profile links">
                  <a
                    href="https://www.linkedin.com/in/brandonleonflores"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                  <span>|</span>
                  <a
                    href="https://github.com/brandon-leonf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              </div>
              <form
                className="contact-form"
                action="mailto:leonfloresbrandon@gmail.com"
                method="post"
                encType="text/plain"
                onSubmit={handleContactSubmit}
              >
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                  minLength={2}
                />

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />

                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  placeholder="Enter your message"
                  required
                  minLength={10}
                />

                <div className="hp-field" aria-hidden="true">
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    tabIndex="-1"
                    autoComplete="off"
                    placeholder="Leave this empty"
                  />
                </div>

                <button type="submit" className="secondary-button">
                  Send Message
                </button>
              </form>
            </div>
          )}
        </section>
      </main>
      {activeProjectVideo ? (
        <div
          className="project-video-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeProjectVideo.name} demo video`}
          onClick={() => setActiveProjectVideo(null)}
        >
          <div className="project-video-modal__panel" onClick={(event) => event.stopPropagation()}>
            <div className="project-video-modal__header">
              <h3>{activeProjectVideo.name}</h3>
              <button
                type="button"
                className="project-video-modal__close"
                aria-label="Close video popup"
                onClick={() => setActiveProjectVideo(null)}
              >
                <i className="bi bi-x-lg" aria-hidden="true" />
              </button>
            </div>
            <video
              ref={projectVideoRef}
              className="project-video-player"
              src={activeProjectVideo.video}
              autoPlay
              controls
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;

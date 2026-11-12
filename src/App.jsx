import "./App.css";
import AboutTitle from "./AboutTitle";
import CodeLabel from "./CodeLabel";
import MobileParticleLogo from "./MobileParticleLogo";
import ProfileParticles from "./ProfileParticles";
import ParticlePortrait from "./ParticlePortrait";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import heroPortrait from "./assets/hero-portrait.jpg";
import cParserImg from "./assets/C_parcer.png";
import arcadePongImg from "./assets/Arcade_Pong.png";
import arkanoidImg from "./assets/Arcanoid.png";
import corePanelThumbImg from "./assets/corepanel-thumb.jpg";
import corePanelDemoVideo from "./assets/corepanel-demo.mp4";

const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://bleonflores1.com").replace(/\/$/, "");
const CANONICAL_HOST = import.meta.env.VITE_CANONICAL_HOST || "";
const DEFAULT_ROBOTS = "index,follow";
const ROLE_TEXT = "Senior Student at NJIT";
const DECODE_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const ROUTES = [
  { id: "about", label: "ABOUT", path: "/about" },
  { id: "education", label: "EDUCATION", path: "/education" },
  { id: "experience", label: "EXPERIENCE", path: "/experience" },
  { id: "projects", label: "PROJECTS", path: "/projects" },
  { id: "contact", label: "CONTACT", path: "/contact" },
];
const NAV_LABELS = ROUTES.reduce((acc, section) => {
  acc[section.id] = section.label;
  return acc;
}, {});

const ROUTE_META = {
  "/": {
    id: "about",
    title: "Brandon Leon | Software Development & Networking Portfolio",
    description: "Brandon Leon is a senior Information Technology student at NJIT focused on Software Development and Networking. Explore his projects, skills, and experience.",
  },
  "/about": {
    id: "about",
    title: "About Brandon Leon | Software Development & Networking",
    description: "Meet Brandon Leon, a senior Information Technology student at NJIT in Red Bank, New Jersey, focused on Software Development and Networking.",
  },
  "/experience": {
    id: "experience",
    title: "Web Development Experience | Brandon Leon",
    description: "Explore Brandon Leon's web development and design experience at Industry Media and Smart Marketing, including WordPress, performance, SEO, HTML, and CSS.",
  },
  "/education": {
    id: "education",
    title: "Information Technology Education | Brandon Leon",
    description: "Brandon Leon is pursuing a B.S. in Information Technology at NJIT and holds an Associate's in Computer Science from Brookdale Community College.",
  },
  "/projects": {
    id: "projects",
    title: "Software & Game Development Projects | Brandon Leon",
    description: "Explore Brandon Leon's CorePanel business dashboard, Mini C-Like language implementation in C++, and Unity games Arcade Pong and Arkanoid.",
  },
  "/contact": {
    id: "contact",
    title: "Contact Brandon Leon | Software Development & Networking",
    description: "Connect with Brandon Leon in Red Bank, New Jersey, about projects and opportunities. Find his email, GitHub, and LinkedIn contact details.",
  },
  "/404": {
    id: "notfound",
    title: "Page Not Found | Brandon Leon",
    description: "This page could not be found. Visit Brandon Leon's portfolio for projects, experience, education, and contact details.",
    robots: "noindex,nofollow",
  },
};

const EXPERIENCE = [
  {
    range: "2023 – Present",
    org: "Industry Media",
    title: "Web Developer / Web Designer",
    body:
      "Develop and maintain WordPress websites, optimizing performance, hosting reliability, and search engine visibility. Diagnose and resolve server-level bottlenecks affecting page load times and responsiveness. Troubleshoot plugin conflicts, excessive scripts, and inefficient configurations to improve website performance. Implement structured data, optimize asset delivery, and perform file-level modifications via SFTP in live production environments. Manage WordPress core and plugin updates while contributing to 99.9% uptime across client websites.",
    tags: [
      "WORDPRESS",
      "SFTP",
      "TECHNICAL SEO",
      "PERFORMANCE OPTIMIZATION",
    ],
  },
  {
    range: "2022 — 2023",
    org: "Smart Marketing",
    title: "Web Designer",
    body:
      "Designed and developed responsive websites and marketing landing pages, focusing on clean layouts, intuitive navigation, and user experience across desktop and mobile devices. Used HTML and CSS to customize website structures, styling, and visual elements while maintaining consistent branding.",
    tags: ["Web Design", "HTML/CSS", "SEO"],
  },
];

const EDUCATION = [
  {
    range: "2023 — 2026",
    org: "New Jersey Institute of Technology",
    title: "B.S. in Information Technology",
    body: "Relevant Coursework:",
    tags: [
      "OPERATING SYSTEMS",
      "COMPUTER NETWORKS",
      "DATABASE SYSTEM DESIGN",
      "PROGRAMMING LANGUAGE CONCEPTS",
      "LINUX",
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
    name: "CorePanel",
    category: "Full-stack application",
    headline: "A central workspace for business operations.",
    problem: "Bring users, client projects, and business documents into one secure admin and client dashboard.",
    date: "2/27/2026",
    body:
      "CorePanel is a project that I implemented, it has a full featured admin and client dashboard system with CRUD functionality for users, projects, images, PDF's and receipts. It has CSRF protection, activity logging, and is deployed on SiteGround hosting.",
    tags: ["PHP", "MYSQL", "CSS", "SITEGROUND", "AUTHENTICATION"],
    link: "https://github.com/brandon-leonf/CorePanel",
    image: corePanelThumbImg,
    video: corePanelDemoVideo,
  },
  {
    name: "Mini C-Like",
    category: "Language & systems",
    headline: "From source code to execution.",
    problem: "Explore how a programming language turns source text into validated, executable instructions.",
    date: "11/16/2024",
    body:
      "Designed and implemented a recursive-descent compiler in C++ that performs lexical analysis, syntax parsing, semantic validation, and runtime execution.",
    tags: ["COMPILERS", "C++", "SYSTEMS PROGRAMMING"],
    link: "https://github.com/brandon-leonf/mini-c",
    image: cParserImg,
  },
  {
    name: "Arcade Pong",
    category: "Interactive experience",
    headline: "A classic game, built for responsive play.",
    problem: "Recreate the familiar Pong experience with responsive controls and a clear interface.",
    date: "3/16/2021",
    body:
      "A Unity-built arcade pong experience with a clean UI and responsive gameplay.",
    tags: ["Unity", "Game Dev", "C#"],
    link: "https://bleonn.itch.io/ping-pong",
    image: arcadePongImg,
  },
  {
    name: "Arkanoid",
    category: "Interactive experience",
    headline: "Rebuilding a retro arcade experience.",
    problem: "Translate a classic brick-breaking game into a playable Unity project with crisp visuals and responsive controls.",
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
    "@id": `${SITE_URL}/#person`,
    description: "Senior Information Technology student at the New Jersey Institute of Technology, focused on Software Development and Networking.",
    jobTitle: "Web Developer / Web Designer",
    affiliation: { "@type": "CollegeOrUniversity", name: "New Jersey Institute of Technology" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Brookdale Community College" },
    address: { "@type": "PostalAddress", addressLocality: "Red Bank", addressRegion: "NJ", addressCountry: "US" },
    knowsAbout: ["Software Development", "Full-Stack Applications", "Mobile Development", "Backend Development", "Database Systems", "Networking", "Linux"],
    sameAs: [
      "https://github.com/brandon-leonf",
      "https://www.linkedin.com/in/brandonleonflores",
    ],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Brandon Leon Portfolio",
    description: ROUTE_META["/"].description,
    url: SITE_URL,
    inLanguage: "en-US",
    sameAs: [
      "https://github.com/brandon-leonf",
      "https://www.linkedin.com/in/brandonleonflores",
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": routeMeta.id === "contact" ? "ContactPage" : "WebPage",
    name: pageName,
    description: routeMeta.description,
    url: canonicalUrl,
    inLanguage: "en-US",
    about: { "@id": `${SITE_URL}/#person` },
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

function normalizePathname(pathname) {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed || "/";
}

function darkModeForCurrentTime() {
  const hour = new Date().getHours();
  return hour >= 19 || hour < 7;
}

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const logoClickTimer = useRef(null);
  const manualTheme = useRef(false);

  useEffect(() => () => clearTimeout(logoClickTimer.current), []);

  function handleLogoClick(event) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setIsMobileMenuOpen(false);
    if (logoClickTimer.current !== null) {
      clearTimeout(logoClickTimer.current);
      logoClickTimer.current = null;
      manualTheme.current = true;
      setIsDarkMode((dark) => !dark);
      return;
    }
    if (event.detail === 0) {
      navigate("/");
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    logoClickTimer.current = setTimeout(() => {
      logoClickTimer.current = null;
      navigate("/");
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    }, 350);
  }

  function handleLogoKeyDown(event) {
    if (event.key === " " || (event.key === "Enter" && event.shiftKey)) {
      event.preventDefault();
      manualTheme.current = true;
      setIsDarkMode((dark) => !dark);
    }
  }
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const theme = new URLSearchParams(window.location.search).get("theme");
    return theme === "dark" || (theme !== "light" && darkModeForCurrentTime());
  });
  useEffect(() => {
    const pinnedTheme = new URLSearchParams(window.location.search).get("theme");
    if (pinnedTheme === "light" || pinnedTheme === "dark") return;
    const updateTheme = () => {
      if (!manualTheme.current) setIsDarkMode(darkModeForCurrentTime());
    };
    const interval = setInterval(updateTheme, 60000);
    document.addEventListener("visibilitychange", updateTheme);
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", updateTheme);
    };
  }, []);
  const [isLogoAnimating, setIsLogoAnimating] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
  const [scrollSection, setScrollSection] = useState("about");
  const canonicalUrl = isKnownRoute ? `${SITE_URL}/` : `${SITE_URL}/404`;

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
    upsertMeta('meta[property="og:site_name"]', "property", "og:site_name", "Brandon Leon Portfolio");
    upsertMeta('meta[property="og:locale"]', "property", "og:locale", "en_US");
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary");
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    upsertCanonical(canonicalUrl);
    upsertSchema(buildSchema(seoPath, canonicalUrl));
    document.dispatchEvent(new Event("route-seo-ready"));
  }, [activeRouteMeta.description, activeRouteMeta.robots, activeRouteMeta.title, canonicalUrl, seoPath]);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    const frameId = requestAnimationFrame(() => setIsLogoAnimating(true));
    const timeoutId = setTimeout(() => setIsLogoAnimating(false), 500);
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timeoutId);
    };
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


  useEffect(() => {
    if (window.location.pathname === "/" && !window.location.hash) return;
    const target = window.location.hash.slice(1) || activeSectionId;
    const frame = requestAnimationFrame(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: "instant", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [activeSectionId]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setScrollSection(entry.target.id);
      }
    }, { rootMargin: "-10% 0px -65% 0px", threshold: 0 });
    document.querySelectorAll(".scroll-section").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const headers = document.querySelectorAll(".scroll-section .section-header");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("divider-revealed");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -24px 0px" });
    headers.forEach((header) => observer.observe(header));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cards = [...document.querySelectorAll(".case-study")];
    const update = () => {
      cards.forEach((card) => {
        const top = Math.min(24, window.innerHeight - card.offsetHeight - 24);
        card.style.setProperty("--project-sticky-top", `${top}px`);
      });
    };
    const resize = new ResizeObserver(update);
    cards.forEach((card) => resize.observe(card));
    window.addEventListener("resize", update);
    update();
    return () => {
      resize.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const lines = document.querySelectorAll(".case-study-meta, .case-study-tags, .case-study-narrative");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("project-line-drawn");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: "0px 0px -20px 0px" });
    lines.forEach((line) => observer.observe(line));
    return () => observer.disconnect();
  }, []);


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
      <main className="resume">
          <div className="electric-divider" aria-hidden="true">
            {Array.from({ length: 20 }, (_, index) => (
              <span key={index} style={{ "--segment": index }} />
            ))}
          </div>

        <aside className="left">
          <div className="profile-header">
            <ProfileParticles />
          <div className="portrait-card">
            <div className="portrait-crop">
              <ParticlePortrait src={heroPortrait} />
            </div>
          </div>

          <div className="brand">
            <NavLink to="/" className="logo" onClick={handleLogoClick} onKeyDown={handleLogoKeyDown}
              aria-label="Home; double-click or press Space to switch light and dark mode"
              title="Click for home · Double-click to switch theme">
              <img src={logo} alt="Brandon Leon logo" />
            </NavLink>
            <div className="identity">
              <h1>Brandon Leon</h1>
              <p className="role" aria-label={ROLE_TEXT}>
                {roleText}
              </p>
            </div>
          </div>

          </div>

          <p className="intro">
            <span className="degree-preview-trigger degree-text">
              Associate&apos;s in Computer Science
            </span>{" "}
            and currently completing my Bachelor&apos;s in Information
            Technology at NJIT.
          </p>

          <div className="navigation" onKeyDown={(event) => {
            if (event.key === "Escape") {
              setIsMobileMenuOpen(false);
              event.currentTarget.querySelector(".menu-toggle")?.focus();
            }
          }}>
          <div className="navigation-toolbar">
          <NavLink to="/" className="mobile-navbar-logo" onClick={handleLogoClick} onKeyDown={handleLogoKeyDown}
            aria-label="Home; double-click or press Space to switch light and dark mode"
            title="Click for home · Double-click to switch theme">
            <MobileParticleLogo />
          </NavLink>

          <button
            type="button"
            className={`menu-toggle ${isMobileMenuOpen ? "is-open" : ""}`}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="navigation-panel"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            <span className="menu-close-label" aria-hidden="true">Close</span>
            <svg className="menu-drawing" viewBox="0 0 36 36" fill="none" aria-hidden="true">
              <path className="menu-frame" d="M1 1 H35 V35 H1 Z" />
              <path className="menu-line menu-line-top" d="M9 11 H27" />
              <path className="menu-line menu-line-middle" d="M9 18 H27" />
              <path className="menu-line menu-line-bottom" d="M9 25 H27" />
              <path className="menu-close-mark" d="M3 18 H33 M33 3 V33" />
            </svg>
          </button>
          </div>
          <div id="navigation-panel" className={`navigation-panel ${isMobileMenuOpen ? "is-open" : ""}`}>
          <nav id="section-navigation" className="section-labels" aria-label="Sections">
            {ROUTES.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-current={scrollSection === section.id ? "location" : undefined}
                className={`section-link ${scrollSection === section.id ? "active" : ""}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="nav-dash" viewBox="0 0 18 12" fill="none" aria-hidden="true">
                  <path d="M1 6 H17" />
                </svg>
                {navDecodeText[section.id].replace(/^\d+\.\s*/, "")}
              </a>
            ))}
          </nav>
          <div className="socials mobile-socials">
            <a aria-label="GitHub" href="https://github.com/brandon-leonf" className="social">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 19c-4.3 1.3-4.3-2.2-6-2.7M15 22v-3.4a3 3 0 0 0-.8-2.3c2.7-.3 5.6-1.3 5.6-6A4.7 4.7 0 0 0 18.5 7a4.4 4.4 0 0 0-.1-3.3s-1-.3-3.4 1.3a11.7 11.7 0 0 0-6 0C6.6 3.4 5.6 3.7 5.6 3.7A4.4 4.4 0 0 0 5.5 7a4.7 4.7 0 0 0-1.3 3.3c0 4.7 2.9 5.7 5.6 6a3 3 0 0 0-.8 2.3V22" />
              </svg>
            </a>
            <a
              aria-label="LinkedIn"
              href="https://www.linkedin.com/in/brandonleonflores"
              className="social"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="9" width="4" height="12" rx="0.5" />
                <circle cx="5" cy="4" r="2" />
                <path d="M11 21V9h4v1.7a4 4 0 0 1 7 2.8V21h-4v-7a1.5 1.5 0 0 0-3 0v7z" />
              </svg>
            </a>
          </div>
          </div>
          </div>

          <div className="socials desktop-socials">
            <a aria-label="GitHub" href="https://github.com/brandon-leonf" className="social">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 19c-4.3 1.3-4.3-2.2-6-2.7M15 22v-3.4a3 3 0 0 0-.8-2.3c2.7-.3 5.6-1.3 5.6-6A4.7 4.7 0 0 0 18.5 7a4.4 4.4 0 0 0-.1-3.3s-1-.3-3.4 1.3a11.7 11.7 0 0 0-6 0C6.6 3.4 5.6 3.7 5.6 3.7A4.4 4.4 0 0 0 5.5 7a4.7 4.7 0 0 0-1.3 3.3c0 4.7 2.9 5.7 5.6 6a3 3 0 0 0-.8 2.3V22" />
              </svg>
              <span>/brandon-leonf</span>
            </a>
            <a
              aria-label="LinkedIn"
              href="https://www.linkedin.com/in/brandonleonflores"
              className="social"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="9" width="4" height="12" rx="0.5" />
                <circle cx="5" cy="4" r="2" />
                <path d="M11 21V9h4v1.7a4 4 0 0 1 7 2.8V21h-4v-7a1.5 1.5 0 0 0-3 0v7z" />
              </svg>
              <span>/brandonleonflores</span>
            </a>
          </div>
        </aside>

        <section className="right">
          <section id="about" className="scroll-section" aria-labelledby="about-title">
            <header className="section-header">
              <span className="section-kicker">Red Bank New Jersey, USA</span>
              <AboutTitle />
            </header>
            <div className="about" >
              <div className="about-copy">
                <h4 className="about-statement">From <span className="statement-concept">concept</span> to code. From code to <span className="statement-impact">impact.</span></h4>
              <p className="summary">
                I&apos;m a senior at the New Jersey Institute of Technology,
                pursuing a Bachelor&apos;s degree in Information Technology with a
                focus on Software Development and Networking.
              </p>
              <p className="summary">
                I enjoy transforming ideas into functional applications that solve
                real-world problems. From designing interfaces to developing backend
                functionality, I find satisfaction in building complete software
                solutions that people can use.
              </p>
              <p className="summary">
                With a foundation in Computer Science and an Information Technology
                education, I approach development with both creativity and technical
                understanding.
              </p>
              <p className="summary">
                What drives me is more than writing code. It&apos;s the challenge of
                solving complex problems, understanding how systems connect, and
                creating technology that makes a lasting impact.
              </p>
              </div>
              <div className="about-grid">
                <div>
                  <h3 className="tag-group-heading">Focus</h3>
                  <div className="tags">
                    {[
                      "Software Development",
                      "Full-Stack Applications",
                      "Mobile Development",
                      "Backend Development",
                      "Database Systems",
                      "Networking",
                      "Linux & Systems",
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
                      "Java",
                      "Python",
                      "JavaScript",
                      "React",
                      "Flutter",
                      "SQL",
                      "Linux",
                      "Bash",
                      "Git",
                    ].map((tag) => (
                      <span key={tag} tabIndex={0}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="education" className="scroll-section" aria-labelledby="education-title">
            <header className="section-header">
              <span className="section-kicker">EDUCATION</span>
              <h2 id="education-title" className="section-title" data-title="EDUCATION">EDUCATION</h2>
            </header>
            <div className="experience education" >
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
          </section>

          <section id="experience" className="scroll-section" aria-labelledby="experience-title">
            <header className="section-header">
              <span className="section-kicker">EXPERIENCE</span>
              <h2 id="experience-title" className="section-title" data-title="EXPERIENCE">EXPERIENCE</h2>
            </header>
            <div className="experience" >
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
          </section>

          <section id="projects" className="scroll-section" aria-labelledby="projects-title">
            <header className="section-header">
              <span className="section-kicker">PROJECTS</span>
              <h2 id="projects-title" className="section-title" data-title="PROJECTS">PROJECTS</h2>
            </header>
            <div className="projects case-studies" >
              <p className="projects-intro">Selected work across full-stack applications, systems programming, and interactive experiences.</p>
              {PROJECTS.map((project, index) => (
                <article className="case-study" key={project.name} style={{ "--project-layer": index + 1 }}>
                  <div className="case-study-meta">
                    <CodeLabel text={`${String(index + 1).padStart(2, "0")} / ${project.category.toUpperCase()}`} />
                    <time dateTime={new Date(project.date).toISOString().slice(0, 10)}>{project.date}</time>
                  </div>
                  <div className="case-study-layout">
                    <div className="case-study-copy">
                      <h3><a href={project.link} target="_blank" rel="noreferrer">{project.name}<span aria-hidden="true"> ↗</span></a></h3>
                      <p className="case-study-headline">{project.headline}</p>
                      <div className="case-study-narrative">
                        <p>{project.body}</p>
                      </div>
                      {project.video && project.name !== "CorePanel" && (
                        <button type="button" className="case-study-demo" onClick={() => setActiveProjectVideo(project)}>
                          <span aria-hidden="true">▷</span> Watch walkthrough
                        </button>
                      )}
                    </div>
                    <a className="case-study-image" href={project.link} target="_blank" rel="noreferrer" aria-label={`View ${project.name}`}>
                      <img src={project.image} alt={`${project.name} project preview`} loading="lazy" decoding="async" />
                      <span>Explore project ↗</span>
                    </a>
                  </div>
                  <div className="case-study-tags" aria-label="Technologies">
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="contact" className="scroll-section" aria-labelledby="contact-title">
            <header className="section-header">
              <span className="section-kicker">CONTACT</span>
              <h2 id="contact-title" className="section-title" data-title="CONTACT">CONTACT</h2>
            </header>
            <div className="contact" >
              <p className="summary contact-intro">
                Have an opportunity or a project in mind? Let&apos;s connect.
              </p>
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
            </div>
          </section>

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

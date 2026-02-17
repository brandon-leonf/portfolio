import "./App.css";
import { useState } from "react";
import logo from "./assets/logo.png";
import cParserImg from "./assets/C_parcer.png";
import arcadePongImg from "./assets/Arcade_Pong.png";
import arkanoidImg from "./assets/Arcanoid.png";

const SECTIONS = [
  { id: "about", label: "ABOUT", index: "01" },
  { id: "experience", label: "EXPERIENCE", index: "02" },
  { id: "projects", label: "PROJECTS", index: "03" },
  { id: "contact", label: "CONTACT", index: "04" },
];

const EXPERIENCE = [
  {
    range: "2023 — 2025",
    org: "New Jersey Institute of Technology",
    title: "B.S. in Computer Science (Network & Security Specialization)",
    body:
      "Currently completing a bachelor’s degree in Information Technology with a focus on network security and applied systems work.",
    tags: ["Networks", "Systems"],
  },
  {
    range: "2019 — 2022",
    org: "Brookdale Community College",
    title: "A.S. in Computer Science",
    body:
      "Built a strong foundation in programming, data structures, and core software engineering practices.",
    tags: ["Programming", "C++", "Problem Solving"],
  },
  {
    range: "2023 — CURRENT",
    org: "Industry Media",
    title: "Web Developer / Web Designer",
    body:
      "Designing and building dynamic WordPress sites focused on performance, accessibility, and clear UX.",
    tags: ["WordPress", "UX/UI", "Performance"],
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

const PROJECTS = [
  {
    name: "Mini C-Like (MCL) Programming Language",
    date: "11/16/2024",
    body:
      "Designed and implemented a mini C-like language as a capstone-style project.",
    tags: ["Compilers", "C", "Parsing"],
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

function App() {
  const [activeSection, setActiveSection] = useState("about");
  const activeMeta = SECTIONS.find((section) => section.id === activeSection);

  return (
    <div className="page">
      <main className="resume">
        <aside className="left">
          <div className="brand">
            <div className="logo">
              <img src={logo} alt="Brandon Leon logo" />
            </div>
            <div className="identity">
              <h1>Brandon Leon</h1>
              <p className="role">Developer & Student at NJIT</p>
            </div>
          </div>

          <p className="intro">
            Hi, I&apos;m Brandon Leon, with an A.S. in Computer Science and a
            B.S. in Information Technology in progress.
          </p>

          <div className="section-labels" role="tablist" aria-label="Sections">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                className="section-link"
                type="button"
                role="tab"
                aria-selected={activeSection === section.id}
                onClick={() => setActiveSection(section.id)}
              >
                — {section.label}
              </button>
            ))}
          </div>

          <div className="socials">
            <a aria-label="GitHub" href="https://github.com" className="social">
              <i className="bi bi-github" aria-hidden="true" />
            </a>
            <a
              aria-label="LinkedIn"
              href="https://www.linkedin.com"
              className="social"
            >
              <i className="bi bi-linkedin" aria-hidden="true" />
            </a>
            <a
              aria-label="Twitter"
              href="https://twitter.com"
              className="social"
            >
              <i className="bi bi-twitter-x" aria-hidden="true" />
            </a>
            <a
              aria-label="Instagram"
              href="https://www.instagram.com"
              className="social"
            >
              <i className="bi bi-instagram" aria-hidden="true" />
            </a>
          </div>
        </aside>

        <section className="right">
          <header className="section-header">
            <span className="section-kicker">
              {activeMeta?.index}. {activeMeta?.label}
            </span>
            <h2 className="section-title">{activeMeta?.label}</h2>
          </header>

          {activeSection === "about" && (
            <div className="about" role="tabpanel">
              <p className="summary">
                I am an Information Technology student at the New Jersey
                Institute of Technology with a passion for building scalable
                digital solutions for businesses.
              </p>
              <p className="summary">
                Currently, I work as a Web Developer at Industry Media, where I
                build and maintain high-performance websites with a focus on
                SEO, site speed, and technical optimization. Beyond web
                technologies, I have a strong foundational background in Java,
                Python, and C++, which allows me to approach software
                engineering with a versatile, problem-solving lens.
              </p>
              <p className="summary">
                I am driven by the challenge of turning technical requirements
                into seamless digital products and am always looking for
                opportunities to apply my skills to innovative, large-scale
                projects.
              </p>
              <div className="about-grid">
                <div>
                  <h3>Focus</h3>
                  <div className="tags">
                    {[
                      "UX/UI",
                      "Accessibility",
                      "WordPress",
                      "Front-end",
                      "SEO",
                    ].map((tag) => (
                      <span key={tag} tabIndex={0}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3>Tools</h3>
                  <div className="tags">
                    {["Java", "Python", "C++", "HTML/CSS", "PHP", "MySQL"].map(
                      (tag) => (
                        <span key={tag} tabIndex={0}>
                          {tag}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "experience" && (
            <div className="experience" role="tabpanel">
              {EXPERIENCE.map((item) => (
                <article className="xp-item" key={`${item.org}-${item.range}`}>
                  <div className="xp-time">{item.range}</div>
                  <div className="xp-body">
                    <h3>{item.org}</h3>
                    <p className="xp-title">{item.title}</p>
                    <p>{item.body}</p>
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

          {activeSection === "projects" && (
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
                        <img src={project.image} alt={project.name} />
                      )}
                      <span className="project-date">{project.date}</span>
                      <span className="project-cta">View Project</span>
                    </a>
                  ) : (
                    <div className="project-thumb" aria-hidden="true">
                      {project.image && (
                        <img src={project.image} alt={project.name} />
                      )}
                      <span className="project-date">{project.date}</span>
                    </div>
                  )}
                  <div className="project-body">
                    <h4>
                      {project.link ? (
                        <a href={project.link} target="_blank" rel="noreferrer">
                          {project.name}
                        </a>
                      ) : (
                        project.name
                      )}
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

          {activeSection === "contact" && (
            <div className="contact" role="tabpanel">
              <p className="summary">
                Let&apos;s build something thoughtful and usable. Reach out for
                collaboration, internships, or freelance work.
              </p>
              <div className="contact-card">
                {CONTACT.map((item) => (
                  <div key={item.label} className="contact-row">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
              <a
                className="primary-button"
                href="mailto:leonfloresbrandon@gmail.com"
              >
                Start a Conversation
              </a>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;

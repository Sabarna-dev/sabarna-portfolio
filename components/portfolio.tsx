"use client";

import { FormEvent, startTransition, useEffect, useState } from "react";
import Image from "next/image";
import { capabilities, now, profile, projects } from "@/lib/content";
import MetalCube from "@/components/metal-cube";

const ArrowUpRight = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M5 19 19 5M8 5h11v11" />
  </svg>
);

const Mark = () => <span className="brand-mark" aria-hidden="true">S.</span>;

const codegpmScreens = [
  { src: "/images/codegpm/signup.png", label: "Onboarding", alt: "CodeGPM create account screen with a collaborative workspace introduction" },
  { src: "/images/codegpm/group.png", label: "Project overview", alt: "CodeGPM project dashboard showing team members, deadline, and project tools" },
  { src: "/images/codegpm/workspace.png", label: "Shared files", alt: "CodeGPM file workspace with uploaded project files and code preview" },
];

function ProjectVisual({ kind }: { kind: string }) {
  if (kind === "gridline") {
    return <div className="gridline-visual">
      <p>Gridline / match play</p>
      <figure><Image src="/images/gridline/local-mode.png" alt="Gridline in local multiplayer mode" fill sizes="(max-width: 760px) 85vw, 34vw" /></figure>
      <figure><Image src="/images/gridline/computer-mode.png" alt="Gridline in computer mode" fill sizes="(max-width: 760px) 65vw, 26vw" /></figure>
    </div>;
  }
  if (kind === "lab") {
    return (
      <div className="experiment-visual" aria-hidden="true">
        <span className="orb orb-one" /><span className="orb orb-two" /><span className="orb orb-three" />
        <div className="experiment-grid" />
        <p>BUILD / TEST / LEARN</p>
      </div>
    );
  }
  return <div className="codegpm-gallery" aria-label="CodeGPM interface gallery">
    <p>Inside CodeGPM</p>
    <div className="codegpm-screens">
      {codegpmScreens.map((screen) => <figure key={screen.src}>
        <Image src={screen.src} alt={screen.alt} fill sizes="(max-width: 760px) 85vw, 34vw" />
        <figcaption>{screen.label}</figcaption>
      </figure>)}
    </div>
  </div>;
}

export function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((node) => reveal.observe(node));
    return () => reveal.disconnect();
  }, []);

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = Object.fromEntries(form.entries());
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error ?? "Request failed");
      startTransition(() => { setStatus("sent"); setMessage("Your message is on its way. I will get back to you soon."); });
      formElement.reset();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again in a moment.";
      startTransition(() => { setStatus("error"); setMessage(errorMessage); });
    }
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <header className="site-header">
        <a href="#top" className="brand brand-home" aria-label="Sabarna Das, home"><span className="profile-avatar"><Image src="/images/sabarna-portrait-v2.png" alt="" fill sizes="40px" /></span><span>Sabarna Das</span></a>
        <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span className={menuOpen ? "hidden-line" : ""} /><span className="sr-only">Toggle menu</span>
        </button>
        <nav id="navigation" className={menuOpen ? "open" : ""} aria-label="Primary navigation">
          <a href="#work" onClick={closeMenu}>Work</a><a href="#about" onClick={closeMenu}>About</a><a href="/Sabarna-Das-Resume.pdf" download>Resume</a><a href="#contact" onClick={closeMenu}>Contact</a>
          <a className="nav-github" href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a>
        </nav>
      </header>

      <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="hero-noise" />
        <p className="eyebrow hero-intro">Independent builder <span /> {profile.location}</p>
        <div className="hero-title-wrap">
          <h1 id="hero-title"><span>Software with</span><strong>intent.</strong></h1>
          <div className="hero-cube"><MetalCube /></div>
        </div>
        <div className="hero-bottom">
          <p>I am Sabarna, a developer shaping useful web products and playful experiments from first principles.</p>
          <a href="#work" className="round-link">Explore the work <ArrowUpRight /></a>
        </div>
        <div className="hero-signal" aria-hidden="true"><span>01</span><i /><span>SCROLL TO EXPLORE</span></div>
      </section>

      <div id="content">
        <section id="work" className="work-section section">
          <div className="section-heading reveal"><p className="eyebrow">Selected work</p><h2>Built to make<br /><i>momentum visible.</i></h2></div>
          <div className="project-list">
            {projects.map((project, index) => (
              <article className={`project-card project-${project.visual} reveal`} key={project.id}>
                <div className="project-copy">
                  <p className="eyebrow">{project.eyebrow}</p>
                  <h3>{project.name}</h3><p className="project-type">{project.type}</p>
                  <p className="project-description">{project.description}</p>
                  <p className="project-outcome">{project.outcome}</p>
                  <ul className="tags" aria-label={`${project.name} technology`}>
                    {project.stack.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <div className="project-actions">
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">{project.primaryLabel} <ArrowUpRight /></a>
                    {project.caseStudyUrl && <a href={project.caseStudyUrl}>Case study <ArrowUpRight /></a>}
                    {project.githubUrl !== project.liveUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer">Source <ArrowUpRight /></a>}
                  </div>
                </div>
                <ProjectVisual kind={project.visual} />
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="about-section section">
          <div className="about-statement reveal"><p className="eyebrow">A little about me</p><h2>I learn by building things that have a reason to exist.</h2><figure className="about-photo"><Image src="/images/sabarna-portrait-v2.png" alt="Sabarna Das in a formal portrait" fill sizes="(max-width: 760px) 62vw, 24vw" /><figcaption>Sabarna Das / Builder in progress</figcaption></figure></div>
          <div className="about-details reveal">
            <p>Currently pursuing a B.Tech at the Institute of Engineering & Management, I am growing into the kind of developer who can take an idea from rough sketch to a working, considered product.</p>
            <p>My strongest pull is toward the intersection of clear interaction, solid engineering, and problems worth untangling. Outside the main build, I make small games and experiments to stay close to the joy of discovery.</p>
            <div className="about-facts"><span>B.Tech / IEM</span><span>Bengal E-Summit participant</span><span>Always learning</span></div>
          </div>
        </section>

        <section className="capabilities-section section">
          <div className="capability-intro reveal"><p className="eyebrow">Capabilities</p><p>A growing toolkit, applied with care.</p></div>
          <div className="capability-list">
            {capabilities.map(([number, title, description, tools]) => <article className="capability reveal" key={number}>
              <span>{number}</span><h3>{title}</h3><p>{description}</p><small>{tools}</small>
            </article>)}
          </div>
        </section>

        <section className="now-section section" aria-labelledby="now-title">
          <div className="now-title reveal"><p className="eyebrow">Right now</p><h2 id="now-title">Growing the<br /><i>craft.</i></h2><p>Balancing deep foundations, practical builds, and the next opportunity to contribute.</p></div>
          <div className="now-list reveal">{now.map(([label, detail], index) => <article key={label}><span>0{index + 1}</span><div><h3>{label}</h3><p>{detail}</p></div></article>)}</div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-inner">
            <div className="contact-title reveal"><p className="eyebrow">Start a conversation</p><h2>Have a good<br /><i>problem?</i></h2><p>Let us turn it into something useful.</p><div className="contact-direct"><a href={`mailto:${profile.email}`}>{profile.email}</a><a href={`mailto:${profile.alternateEmail}`}>{profile.alternateEmail}</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a><a href="/Sabarna-Das-Resume.pdf" download>Download resume <ArrowUpRight /></a></div></div>
            <form className="contact-form reveal" onSubmit={submitContact}>
              <label>Name<input required name="name" autoComplete="name" placeholder="Your name" /></label>
              <label>Email<input required name="email" type="email" autoComplete="email" placeholder="you@example.com" /></label>
              <label>Tell me about it<textarea required name="message" minLength={20} placeholder="A project, question, or opportunity..." /></label>
              <div className="honeypot" aria-hidden="true"><label>Company<input name="company" tabIndex={-1} autoComplete="off" /></label></div>
              <button className="submit-button" disabled={status === "sending"} type="submit">{status === "sending" ? "Sending..." : "Send message"} <ArrowUpRight /></button>
              <p className={`form-message ${status}`} role="status" aria-live="polite">{message}</p>
            </form>
          </div>
        </section>
      </div>

      <footer><a href="#top" className="brand"><Mark /><span>Sabarna Das</span></a><p>Designed and built with intent.</p><span className="footer-links"><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a><a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a></span></footer>
    </>
  );
}

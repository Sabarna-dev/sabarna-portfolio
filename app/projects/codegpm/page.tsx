import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CodeGPM case study",
  description: "How Sabarna Das and Priyangshu built a full-stack workspace for student project teams.",
};

const features = [
  ["01", "Protected access", "JWT authentication, bcrypt password hashing, and protected routes keep each workspace private."],
  ["02", "Groups that work", "Students can create teams or join with a unique code, then work from a shared project home."],
  ["03", "Live conversation", "Socket.IO keeps group chat responsive for everyone in the workspace."],
  ["04", "Files in context", "Multer and GridFS support uploads, downloads, storage monitoring, and practical limits."],
  ["05", "Admin visibility", "A monitoring dashboard gives administrators control over users, groups, files, and messages."],
  ["06", "Useful first touch", "A public landing page introduces the product with stats and a feedback path."],
];

const stack = [
  ["Client", "React, Vite, React Router, Tailwind CSS"],
  ["Server", "Node.js, Express.js, Socket.IO"],
  ["Data", "MongoDB, Mongoose, GridFS"],
  ["Security", "JWT, bcrypt, Helmet, CORS"],
  ["Delivery", "Multer, Nodemailer"],
];

const screens = [
  ["/images/codegpm/signup.png", "A new team member creates an account before entering a workspace."],
  ["/images/codegpm/group.png", "The project home makes the team, deadline, group details, and tools easy to scan."],
  ["/images/codegpm/workspace.png", "A shared file workspace keeps resources and code previews close to the project."],
];

export default function CodeGpmCaseStudy() {
  return <main className="case-study">
    <header className="case-nav"><Link href="/">S. <span>Back to portfolio</span></Link><a href="https://codegpm.is-a.dev" target="_blank" rel="noreferrer">Visit CodeGPM ↗</a></header>
    <section className="case-hero">
      <p className="eyebrow">Case study / 01</p>
      <h1>One workspace.<br /><i>Fewer loose ends.</i></h1>
      <div className="case-intro"><p>CodeGPM is a collaborative full-stack platform that gives student teams a clear home for their work, conversations, and project resources.</p><p>Co-created by Sabarna Das and Priyangshu.</p></div>
      <div className="case-meta"><span>Full-stack web application</span><span>Collaborative project</span><span>2026</span></div>
    </section>
    <figure className="case-cover"><Image src="/images/codegpm/group.png" alt="CodeGPM project overview dashboard" fill priority sizes="(max-width: 900px) 100vw, 85vw" /><figcaption>Project workspace / team overview</figcaption></figure>

    <section className="case-section case-problem"><p className="eyebrow">The brief</p><div><h2>Group projects lose momentum when the work is scattered.</h2><p>Student teams often bounce between chat apps, file links, personal notes, and unclear responsibilities. CodeGPM brings the essential project loop into one system: access the group, communicate in real time, share files, and keep the workspace understandable.</p></div></section>

    <section className="case-section case-challenge"><p className="eyebrow">The hard part</p><div><h2>Real-time collaboration has to stay safe and consistent.</h2><p>Our biggest engineering challenge was building collaboration that remained reliable across multiple clients. Authorization, group access, storage limits, file uploads, and Socket.IO updates all had to work together without exposing the wrong data or leaving the interface out of sync.</p></div></section>

    <section className="case-section case-contribution"><p className="eyebrow">My contribution</p><div><h2>I helped build the product loop end to end.</h2><p>I worked across backend logic and frontend experience: authentication, group creation, workspace access, file upload flows, real-time chat integration, and the admin monitoring system. I also helped keep the interface approachable and visually consistent.</p></div></section>

    <section className="case-section case-features"><p className="eyebrow">What we shipped</p><div className="feature-grid">{features.map(([number, title, description]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>

    <section className="case-section case-stack"><p className="eyebrow">Technology</p><div className="stack-list">{stack.map(([label, tools]) => <div key={label}><span>{label}</span><p>{tools}</p></div>)}</div></section>

    <section className="case-section case-gallery"><p className="eyebrow">Product moments</p><div className="case-screens">{screens.map(([src, caption]) => <figure key={src}><Image src={src} alt={caption} width={1600} height={812} sizes="(max-width: 760px) 92vw, 72vw" /><figcaption>{caption}</figcaption></figure>)}</div></section>

    <section className="case-learning"><p className="eyebrow">What I learned</p><h2>Building a real product taught me to connect the details.</h2><p>From modeling data with MongoDB and Mongoose to securing flows with JWT and bcrypt, CodeGPM taught me how frontend and backend decisions meet in a live application. It also made collaboration itself part of the engineering work.</p></section>
    <section className="case-cta"><p>See the system in motion.</p><div><a href="https://codegpm.is-a.dev" target="_blank" rel="noreferrer">Visit CodeGPM ↗</a><a href="https://github.com/Sabarna-dev/Group-Project-Manager" target="_blank" rel="noreferrer">View source ↗</a></div></section>
  </main>;
}

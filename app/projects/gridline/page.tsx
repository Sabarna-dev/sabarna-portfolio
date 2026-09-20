import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gridline case study",
  description: "Gridline is a solo-built Tic-Tac-Toe experience by Sabarna Das.",
};

const details = [
  ["01", "Two ways to play", "Choose a local duel for two players or take on the computer in a focused solo mode."],
  ["02", "A match, not one round", "Custom player names, score tracking, draws, and a round log make every match feel complete."],
  ["03", "Designed feedback", "Clear win states, color-coded marks, sound controls, and a direct reset flow keep the game easy to read."],
  ["04", "Built to respond", "The interface adapts across screen sizes so the board, controls, and score remain usable everywhere."],
];

export default function GridlineCaseStudy() {
  return <main className="case-study gridline-case">
    <header className="case-nav"><Link href="/">S. <span>Back to portfolio</span></Link><a href="https://github.com/sanjaykumarsad65-netizen/My_FIRST_PROJECT" target="_blank" rel="noreferrer">View source ↗</a></header>
    <section className="case-hero">
      <p className="eyebrow">Case study / 02</p>
      <h1>Make your<br /><i>move.</i></h1>
      <div className="case-intro"><p>Gridline is a premium browser-based Tic-Tac-Toe experience that transforms a timeless game into a complete, replayable match.</p><p>Designed and built solo as my first web development project.</p></div>
      <div className="case-meta"><span>Solo project</span><span>Game interface</span><span>HTML / CSS / JavaScript</span></div>
    </section>
    <figure className="case-cover"><Image src="/images/gridline/local-mode.png" alt="Gridline Tic-Tac-Toe game in local duel mode" fill priority sizes="(max-width: 900px) 100vw, 85vw" /><figcaption>Local duel / round complete</figcaption></figure>

    <section className="case-section case-problem"><p className="eyebrow">The project</p><div><h2>My first chance to build the whole experience.</h2><p>I wanted to take a familiar game and make it feel intentional from the first move to the final score. Gridline became a practical way to learn how interface design, state, game rules, and small feedback details work together in a real web project.</p></div></section>

    <section className="case-section case-contribution"><p className="eyebrow">My role</p><div><h2>Solo developer from visual idea to finished game.</h2><p>I designed and built Gridline independently using HTML, CSS, and JavaScript. That meant shaping the visual system, implementing the game logic, managing player and match state, adding sound, and making the interface work responsively.</p></div></section>

    <section className="case-section case-features"><p className="eyebrow">What I built</p><div className="feature-grid">{details.map(([number, title, description]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>

    <section className="case-section case-stack"><p className="eyebrow">Technology</p><div className="stack-list"><div><span>Interface</span><p>HTML, CSS, JavaScript</p></div><div><span>Workflow</span><p>npm, Git, GitHub</p></div><div><span>Focus</span><p>State management, responsive design, interaction feedback</p></div></div></section>

    <section className="case-section case-gallery"><p className="eyebrow">Modes in action</p><div className="case-screens"><figure><Image src="/images/gridline/local-mode.png" alt="Gridline local multiplayer score and game board" width={1600} height={877} sizes="(max-width: 760px) 92vw, 72vw" /><figcaption>Local duel with custom player names, round history, and score tracking.</figcaption></figure><figure><Image src="/images/gridline/computer-mode.png" alt="Gridline computer mode score and game board" width={1600} height={877} sizes="(max-width: 760px) 92vw, 72vw" /><figcaption>Computer mode retains the same clear match flow and score system.</figcaption></figure></div></section>

    <section className="case-learning"><p className="eyebrow">What I learned</p><h2>Small projects can teach the full product loop.</h2><p>Gridline taught me the value of finishing. I learned how to plan a user flow, keep game state coherent, create responsive layouts, and make small interface details feel deliberate. It gave me the foundation to move on to more complex full-stack work.</p></section>
    <section className="case-cta"><p>Play the next move.</p><div><a href="https://github.com/sanjaykumarsad65-netizen/My_FIRST_PROJECT" target="_blank" rel="noreferrer">View source ↗</a><Link href="/">Back to portfolio</Link></div></section>
  </main>;
}

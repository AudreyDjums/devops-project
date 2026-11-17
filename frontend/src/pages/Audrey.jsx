
import "./Audrey.css";

export default function Audrey() {
  return (
    <div className="audrey-page">
      <header className="audrey-header">
        <div className="audrey-brand">
          <span className="audrey-logo">A.</span>
          <strong>Audrey's Space</strong>
        </div>
        <span>Teamspace</span>
      </header>

      <main className="audrey-main">
        <section className="audrey-hero">
          <p className="audrey-eyebrow">
            MY PERSONAL SPACE
          </p>
          <h1>Hello, I'm Audrey 👋</h1>
          <p>Product Manager • DevOps Team Member</p>
        </section>

        <section className="audrey-card">
          <h2>About me</h2>
          <p>
            Je suis Audrey Larissa DJUMO TICHEU,
            membre de l'équipe Teamspace.
            Je participe au projet DevOps Lab 1.
          </p>

          <h2>My contributions</h2>

          <div className="audrey-skills">
            <span>React.js</span>
            <span>Git & GitHub</span>
            <span>Docker</span>
            <span>CI/CD</span>
          </div>

          <a className="audrey-back" href="/">
            ← Back to Teamspace
          </a>
        </section>
      </main>
    </div>
  );
}

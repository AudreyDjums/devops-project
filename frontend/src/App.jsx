import { useState } from "react";
import "./App.css";

const people = [
  {
    id: 1,
    name: "Roland Landry SILEDJIE MAMBOU",
    role: "Fullstack Developer",
    avatar: "👨🏾‍💻",
    description: "Builds practical web applications and enjoys solving problems.",
    skills: ["React", "Node.js", "SQL"],
    color: "#ede9fe",
  },
  {
    id: 2,
    name: "Mauranne Gloire Agnes AKAM AKAM",
    role: "Lead Developer",
    avatar: "👩🏾‍💻",
    description: "Designs beautiful user interfaces and creates intuitive user experiences.",
    skills: ["UI/UX", "Design Systems", "Prototyping"],
    color: "#fce7f3",
  },
  {
    id: 3,
    name: "Audrey Larissa DJUMO TICHEU",
    role: "Product Manager",
    avatar: "👩🏽‍💼",
    description: "Keeps the team connected and turns ideas into completed projects.",
    skills: ["Agile", "Planning", "Communication"],
    color: "#d1fae5",
  },
];

export default function App() {
  const [search, setSearch] = useState("");

  const filteredPeople = people.filter((person) =>
    `${person.name} ${person.role} ${person.skills.join(" ")}`
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  return (
    <div className="dashboard">
      <header className="topbar">
        <a className="brand" href="./">
          <span className="brand-icon">t.</span>
          Teamspace
        </a>
        <span className="workspace-label">Our workspace</span>
      </header>

      <main>
        <section className="intro">
          <p className="eyebrow">THE PEOPLE BEHIND THE WORK</p>
          <h1>Small team. Big ideas.</h1>
          <p>Meet the people bringing our projects to life.</p>
        </section>

        <section className="stats" aria-label="Team overview">
          <div><strong>03</strong><span>Team members</span></div>
          <div><strong>03</strong><span>Specialties</span></div>
          <div><strong>01</strong><span>Shared vision</span></div>
        </section>

        <section aria-labelledby="team-heading">
          <div className="section-header">
            <h2 id="team-heading">Meet our team</h2>
            <input
              type="search"
              aria-label="Search team members"
              placeholder="Search names, roles, skills..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="profile-grid">
            {filteredPeople.map((person) => (
              <article className="profile-card" key={person.id}>
                <div
                  className="profile-cover"
                  style={{ backgroundColor: person.color }}
                >
                  <span className="avatar" aria-hidden="true">
                    {person.avatar}
                  </span>
                </div>

                <div className="profile-content">
                  <h3>{person.name}</h3>
                  <p className="role">{person.role}</p>
                  <p className="description">{person.description}</p>
                  <ul className="skills" aria-label={`${person.name}'s skills`}>
                    {person.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          {filteredPeople.length === 0 && (
            <p className="empty-state" role="status">
              No matching team members. Try another search.
            </p>
          )}
        </section>

        <footer>Three perspectives. One team.</footer>
      </main>
    </div>
  );
}
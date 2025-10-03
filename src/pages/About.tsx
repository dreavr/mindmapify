export default function About() {
    return (
      <main className="container">
        <section className="section">
          <h2>Our Mission</h2>
          <p className="sub">
            MindMapify is dedicated to empowering people to visualize their thoughts and ideas through innovative mind mapping technology.
            Our mission is to foster creativity and collaboration, enabling users to see connections and insights that were previously hidden.
          </p>
        </section>
  
        <section className="team">
          <h3>Meet the Team</h3>
          <div className="team-grid">
            <div className="member">
              <div className="avatar" /><div className="member-name">Alice</div>
              <p>Diverse skills and experience, focused on transforming collaboration.</p>
            </div>
            <div className="member">
              <div className="avatar" /><div className="member-name">Bob</div>
              <p>Engineering lead, passionate about usable, robust tools.</p>
            </div>
            <div className="member">
              <div className="avatar" /><div className="member-name">Carol</div>
              <p>Design & UX, turning complexity into clarity.</p>
            </div>
          </div>
        </section>
      </main>
    );
  }  
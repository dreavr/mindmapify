import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="container">
      <section className="hero">
        <h1>Welcome to MindMapify</h1>
        <p className="sub">
          Visualize your ideas and collaborate in real-time with our intuitive mind mapping tool.
        </p>
        <div className="hero-cta">
          <Link to="/editor" className="btn btn-primary">Create Mind Map</Link>
        </div>
        <Link to="/templates" className="muted-link">Explore Templates</Link>
      </section>

      <section className="features">
        <div className="feature">
          <div className="illus" />
          <h3>Collaborate with Ease</h3>
          <p>Work together with your team in real-time to brainstorm and organize ideas.</p>
        </div>
        <div className="feature">
          <div className="illus" />
          <h3>Customizable Templates</h3>
          <p>Choose from a variety of templates to fit your personal or professional needs.</p>
        </div>
        <div className="feature">
          <div className="illus" />
          <h3>Secure and Reliable</h3>
          <p>Your data is protected with top-notch security measures, ensuring privacy and reliability.</p>
        </div>
      </section>
    </main>
  );
}
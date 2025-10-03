export default function Contact() {
    return (
      <main className="container">
        <section className="card form">
          <h2>Contact Us</h2>
          <label>Name</label>
          <input className="input" placeholder="Your name" />
          <label>Email</label>
          <input className="input" placeholder="you@example.com" />
          <label>Message</label>
          <textarea className="input" rows={5} placeholder="Tell us more..." />
  
          <button className="btn btn-primary w-full">Submit</button>
        </section>
  
        <section className="section">
          <h3>Contact Information</h3>
          <p>Phone: (123) 456-7890</p>
          <p>Email: info@mindmapify.com</p>
        </section>
      </main>
    );
  }  
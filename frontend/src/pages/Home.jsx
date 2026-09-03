import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const domains = [
    {
      id: 1,
      number: "01",
      title: "Software Development",
      description:
        "Build applications, APIs, platforms and software products.",
    },
    {
      id: 3,
      number: "02",
      title: "Data Science & Analytics",
      description:
        "Turn data into insights, decisions and measurable impact.",
    },
    {
      id: 4,
      number: "03",
      title: "AI & Machine Learning",
      description:
        "Build intelligent systems with machine learning, deep learning and generative AI.",
    },
    {
      id: 5,
      number: "04",
      title: "Cloud & DevOps",
      description:
        "Build, deploy and operate reliable cloud-based systems.",
    },
    {
      id: 6,
      number: "05",
      title: "Cybersecurity",
      description:
        "Protect applications, systems, networks and data from threats.",
    },
  ];

  const journey = [
    {
      number: "01",
      title: "Domain",
      description: "Find the field that interests you.",
    },
    {
      number: "02",
      title: "Role",
      description: "Discover careers that match your interests.",
    },
    {
      number: "03",
      title: "Technology",
      description: "Choose the technology stack you want to explore.",
    },
    {
      number: "04",
      title: "Skills",
      description: "Understand what you actually need to learn.",
    },
    {
      number: "05",
      title: "Roadmap",
      description: "Follow a structured path from learning to job-ready.",
    },
  ];

  return (
    <div className="cn-page">
      <Navbar />

      {/* =========================
          HERO
      ========================== */}
      <main>
        <section className="cn-hero">
          <div className="cn-container">
            <div className="cn-hero-content cn-animate">

              <div className="cn-eyebrow">
                AI-powered career navigation
              </div>

              <h1>
                Your career doesn't
                <br />
                have to be figured out
                <br />
                <span>yet.</span>
              </h1>

              <p className="cn-hero-description">
                Explore technology, discover careers, understand the skills
                you need, and follow a clear path from learning to becoming
                job-ready.
              </p>

              <div className="cn-hero-actions">
                <Link to="/dashboard" className="cn-primary-btn">
                  Start Exploring
                </Link>

                <Link to="/ai-advisor" className="cn-secondary-btn">
                  Ask AI Advisor
                </Link>
              </div>

            </div>
          </div>
        </section>


        {/* =========================
            DOMAIN EXPLORATION
        ========================== */}
        <section className="cn-section">
          <div className="cn-container">

            <div className="cn-section-header">
              <div className="cn-section-label">
                Career exploration
              </div>

              <h2>
                What are you curious about?
              </h2>

              <p>
                You don't need to know your exact career yet. Start with a
                technology area that sounds interesting and explore from there.
              </p>
            </div>


            <div className="cn-grid">
              {domains.map((domain) => (
                <Link
                  key={domain.id}
                  to={`/roles/${domain.id}`}
                  className="cn-domain-card"
                >
                  <div>
                    <div className="cn-domain-number">
                      {domain.number}
                    </div>
                  </div>

                  <div>
                    <h3>{domain.title}</h3>

                    <p>{domain.description}</p>

                    <div className="cn-domain-arrow">
                      Explore domain →
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>


        {/* =========================
            THE JOURNEY
        ========================== */}
        <section className="cn-section">
          <div className="cn-container">

            <div className="cn-section-header">
              <div className="cn-section-label">
                The journey
              </div>

              <h2>
                From curiosity to career.
              </h2>

              <p>
                A structured path that helps you understand what to learn,
                why it matters, and where it can take you.
              </p>
            </div>


            <div className="cn-roadmap">
              {journey.map((step) => (
                <div
                  className="cn-roadmap-step"
                  key={step.number}
                >
                  <div className="cn-roadmap-number">
                    {step.number}
                  </div>

                  <div className="cn-roadmap-content">
                    <h3>{step.title}</h3>

                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>


        {/* =========================
            AI ADVISOR
        ========================== */}
        <section className="cn-section">
          <div className="cn-container">

            <div className="cn-ai-section">
              <div className="cn-ai-section-content">

                <div className="cn-section-label">
                  AI career advisor
                </div>

                <h2>
                  Not sure where
                  <br />
                  you belong?
                </h2>

                <p>
                  Tell us about your interests, skills and goals. Let AI help
                  you find a career direction that makes sense for you.
                </p>

                <Link
                  to="/ai-advisor"
                  className="cn-primary-btn"
                >
                  Find My Career →
                </Link>

              </div>
            </div>

          </div>
        </section>


        {/* =========================
            FINAL CTA
        ========================== */}
        <section className="cn-section">
          <div className="cn-container">

            <div
              className="cn-section-header"
              style={{ marginBottom: 0 }}
            >
              <div className="cn-section-label">
                Start here
              </div>

              <h2>
                You don't need all the answers.
              </h2>

              <p>
                You just need a place to start.
              </p>

              <div className="cn-hero-actions">
                <Link
                  to="/dashboard"
                  className="cn-primary-btn"
                >
                  Start Exploring
                </Link>
              </div>
            </div>

          </div>
        </section>

      </main>


      {/* =========================
          FOOTER
      ========================== */}
      <footer className="cn-footer">
        <div className="cn-container">

          <div className="cn-footer-inner">

            <div>
              <Link to="/" className="cn-logo">
                Career Navigator <span>AI</span>
              </Link>
            </div>

            <p>
              © 2026 Career Navigator AI
            </p>

          </div>

        </div>
      </footer>

    </div>
  );
}

export default Home;
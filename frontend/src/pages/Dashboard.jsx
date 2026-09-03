import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/api";

function Dashboard() {
  const navigate = useNavigate();

  const [domains, setDomains] = useState([]);
  const [roles, setRoles] = useState([]);
  const [skills, setSkills] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      const [
        domainsResponse,
        rolesResponse,
        skillsResponse,
        companiesResponse,
      ] = await Promise.all([
        api.get("/domains"),
        api.get("/roles"),
        api.get("/skills"),
        api.get("/companies"),
      ]);

      setDomains(domainsResponse.data);
      setRoles(rolesResponse.data);
      setSkills(skillsResponse.data);
      setCompanies(companiesResponse.data);

    } catch (error) {
      console.error(
        "Failed to load dashboard:",
        error
      );

    } finally {
      setLoading(false);
    }
  };

  const openDomain = (domainId) => {
    navigate(`/roles/${domainId}`);
  };

  return (
    <div className="cn-page">

      <Navbar />

      <main className="dashboard-page">

        {/* HERO */}

        <section className="dashboard-hero-new">

          <div className="cn-eyebrow">
            CAREER NAVIGATOR AI
          </div>

          <h1>
            Your career.
            <br />
            <span>Starts here.</span>
          </h1>

          <p>
            Explore technology careers, understand
            the skills you need and build a clear path
            toward becoming job-ready.
          </p>

        </section>


        {/* STATS */}

        <section className="dashboard-stats-new">

          <div
            className="dashboard-stat-new"
            onClick={() =>
              document
                .getElementById("domains-section")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            <strong>
              {loading
                ? "—"
                : String(domains.length).padStart(2, "0")}
            </strong>

            <span>CAREER DOMAINS</span>
          </div>


          <div
            className="dashboard-stat-new"
            onClick={() =>
              navigate("/recommendation")
            }
          >
            <strong>
              {loading
                ? "—"
                : String(roles.length).padStart(2, "0")}
            </strong>

            <span>CAREER ROLES</span>
          </div>


          <div
            className="dashboard-stat-new"
            onClick={() =>
              document
                .getElementById("skills-section")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            <strong>
              {loading
                ? "—"
                : String(skills.length).padStart(2, "0")}
            </strong>

            <span>SKILLS</span>
          </div>


          <div
            className="dashboard-stat-new"
            onClick={() =>
              document
                .getElementById("companies-section")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            <strong>
              {loading
                ? "—"
                : String(companies.length).padStart(2, "0")}
            </strong>

            <span>COMPANIES</span>
          </div>

        </section>


        {/* DOMAINS */}

        <section
          id="domains-section"
          className="dashboard-section-new"
        >

          <div className="dashboard-section-heading">

            <div>
              <div className="cn-section-label">
                CAREER EXPLORATION
              </div>

              <h2>
                Find your direction.
              </h2>
            </div>

            <p>
              Explore technology domains and discover
              the career paths inside them.
            </p>

          </div>


          {loading ? (
            <div className="cn-loading">
              Loading career domains...
            </div>
          ) : domains.length === 0 ? (
            <div className="cn-empty">
              No career domains available.
            </div>
          ) : (

            <div className="dashboard-domain-grid">

              {domains.map((domain, index) => (

                <article
                  key={domain.id}
                  className="dashboard-domain-card"
                  onClick={() =>
                    openDomain(domain.id)
                  }
                >

                  <div className="dashboard-domain-top">

                    <span>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span>
                      ↗
                    </span>

                  </div>

                  <div>

                    <h3>
                      {domain.name}
                    </h3>

                    <p>
                      {domain.description}
                    </p>

                  </div>

                  <div className="dashboard-domain-footer">
                    <span>
                      EXPLORE DOMAIN
                    </span>

                    <span>
                      →
                    </span>
                  </div>

                </article>

              ))}

            </div>

          )}

        </section>


        {/* SKILLS */}

        <section
          id="skills-section"
          className="dashboard-section-new"
        >

          <div className="dashboard-section-heading">

            <div>
              <div className="cn-section-label">
                BUILD YOUR PROFILE
              </div>

              <h2>
                Skills that matter.
              </h2>
            </div>

            <p>
              Discover the technical skills used across
              today's technology careers.
            </p>

          </div>


          <div className="dashboard-skills-list">

            {skills.slice(0, 16).map((skill) => (

              <button
                key={skill.id}
                className="dashboard-skill-pill"
                onClick={() =>
                  navigate(`/courses/${skill.id}`)
                }
              >
                {skill.name}
                <span>↗</span>
              </button>

            ))}

          </div>

        </section>


        {/* COMPANIES */}

        <section
          id="companies-section"
          className="dashboard-section-new"
        >

          <div className="dashboard-section-heading">

            <div>
              <div className="cn-section-label">
                CAREER OPPORTUNITIES
              </div>

              <h2>
                Where careers happen.
              </h2>
            </div>

            <p>
              Explore companies connected to
              technology career paths.
            </p>

          </div>


          <div className="dashboard-company-list">

            {companies.slice(0, 8).map((company) => (

              <div
                key={company.id}
                className="dashboard-company-row"
              >

                <div>

                  <h3>
                    {company.name}
                  </h3>

                  {company.description && (
                    <p>
                      {company.description}
                    </p>
                  )}

                </div>

                <span>↗</span>

              </div>

            ))}

          </div>

        </section>


        {/* CTA */}

        <section className="dashboard-final-cta">

          <div className="cn-section-label">
            YOUR NEXT MOVE
          </div>

          <h2>
            Don't just choose a job.
            <br />
            <span>Choose your direction.</span>
          </h2>

          <button
            onClick={() =>
              document
                .getElementById("domains-section")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            Explore Careers ↗
          </button>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;
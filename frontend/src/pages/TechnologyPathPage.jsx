import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import "../styles/career-pages.css";

function TechnologyPathPage() {
  const { technologyPathId } = useParams();
  const navigate = useNavigate();

  const [path, setPath] = useState(null);
  const [variants, setVariants] = useState([]);
  const [skills, setSkills] = useState([]);
  const [roadmap, setRoadmap] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTechnologyPath();
  }, [technologyPathId]);

  const fetchTechnologyPath = async () => {
    try {
      setLoading(true);
      setError("");

      const pathResponse = await api.get(
        `/technology-paths/${technologyPathId}`
      );

      const currentPath = pathResponse.data;
      setPath(currentPath);

      const variantsResponse = await api.get(
        `/technology-paths/${technologyPathId}/variants`
      );

      const currentVariants = variantsResponse.data;
      setVariants(currentVariants);

      if (currentVariants.length === 0) {
        const skillsResponse = await api.get(
          `/technology-paths/${technologyPathId}/skills`
        );

        setSkills(skillsResponse.data);

        const roadmapResponse = await api.get(
          `/roadmaps/technology-path/${technologyPathId}`
        );

        setRoadmap(roadmapResponse.data);
      } else {
        setSkills([]);
        setRoadmap([]);
      }

    } catch (error) {
      console.error(
        "Technology Path Error:",
        error.response?.data || error.message
      );

      setError("Unable to load technology path.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="career-page">
        <div className="career-container">
          <div className="career-empty">
            <h2 className="career-empty-title">
              Loading...
            </h2>

            <p className="career-empty-text">
              Preparing your technology path.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="career-page">
        <div className="career-container">
          <div className="career-empty">

            <h2 className="career-empty-title">
              {error}
            </h2>

            <button
              className="career-back"
              onClick={() => navigate(-1)}
            >
              ← Go Back
            </button>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="career-page">
      <div className="career-container">

        <button
          className="career-back"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        {/* HEADER */}
        <header className="career-header">

          <div className="career-eyebrow">
            Technology Path
          </div>

          <h1 className="career-title">
            {path?.name}
          </h1>

          <p className="career-subtitle">
            {path?.description}
          </p>

        </header>

        <hr className="career-divider" />

        {/* =====================================================
            VARIANTS
        ===================================================== */}

        {variants.length > 0 && (
          <section className="career-section">

            <div className="career-section-header">
              <h2 className="career-section-title">
                Choose Your Technology Stack
              </h2>

              <p className="career-section-description">
                Choose the technology stack you want to
                learn and build your career in.
              </p>
            </div>

            <div className="path-grid">

              {variants.map((variant) => (
                <div
                  key={variant.id}
                  className="path-card"
                  onClick={() =>
                    navigate(
                      `/technology-path/${variant.id}`
                    )
                  }
                >
                  <div>
                    <h3 className="path-card-title">
                      {variant.name}
                    </h3>

                    <p className="path-card-description">
                      {variant.description}
                    </p>
                  </div>

                  <span className="path-card-link">
                    Explore Stack →
                  </span>
                </div>
              ))}

            </div>
          </section>
        )}

        {/* =====================================================
            SKILLS
        ===================================================== */}

        {variants.length === 0 && (
          <>
            <section className="career-section">

              <div className="career-section-header">
                <h2 className="career-section-title">
                  Skills You Need
                </h2>

                <p className="career-section-description">
                  Learn these skills to become proficient in{" "}
                  {path?.name}.
                </p>
              </div>

              {skills.length === 0 ? (
                <div className="career-empty">
                  <h3 className="career-empty-title">
                    No skills available.
                  </h3>

                  <p className="career-empty-text">
                    Skills for this technology stack
                    have not been added yet.
                  </p>
                </div>
              ) : (
                <div className="skill-grid">

                  {skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="skill-card"
                      onClick={() =>
                        navigate(`/skill/${skill.id}`)
                      }
                    >
                      <h3 className="skill-card-title">
                        {skill.name}
                      </h3>

                      <p className="skill-card-description">
                        {skill.description}
                      </p>

                      <span className="skill-card-link">
                        Explore Skill →
                      </span>
                    </div>
                  ))}

                </div>
              )}

            </section>

            <hr className="career-divider" />

            {/* =================================================
                ROADMAP
            ================================================= */}

            <section className="career-section">

              <div className="career-section-header">
                <h2 className="career-section-title">
                  Career Roadmap
                </h2>

                <p className="career-section-description">
                  Follow this step-by-step roadmap to become
                  proficient in {path?.name}.
                </p>
              </div>

              {roadmap.length === 0 ? (
                <div className="career-empty">
                  <h3 className="career-empty-title">
                    No roadmap available.
                  </h3>

                  <p className="career-empty-text">
                    A roadmap for this technology stack
                    has not been added yet.
                  </p>
                </div>
              ) : (
                <div className="roadmap-list">

                  {[...roadmap]
                    .sort(
                      (a, b) =>
                        a.step_order - b.step_order
                    )
                    .map((step) => (
                      <div
                        key={step.id}
                        className="roadmap-card"
                      >
                        <div className="roadmap-number">
                          {step.step_order}
                        </div>

                        <div className="roadmap-content">
                          <h3 className="roadmap-title">
                            {step.title}
                          </h3>

                          {step.description && (
                            <p className="roadmap-description">
                              {step.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}

                </div>
              )}

            </section>
          </>
        )}

      </div>
    </div>
  );
}

export default TechnologyPathPage;
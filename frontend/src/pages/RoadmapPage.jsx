import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import "../styles/career-pages.css";

function RoadmapPage() {
  const { roleId } = useParams();
  const navigate = useNavigate();

  const [role, setRole] = useState(null);
  const [roadmaps, setRoadmaps] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoadmap();
  }, [roleId]);

  const fetchRoadmap = async () => {
    try {
      setLoading(true);

      const [roleResponse, roadmapResponse] =
        await Promise.all([
          api.get(`/roles/${roleId}`),
          api.get(`/roadmaps/role/${roleId}`),
        ]);

      setRole(roleResponse.data);
      setRoadmaps(roadmapResponse.data);

    } catch (error) {
      console.log(error);
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
              Loading roadmap...
            </h2>

            <p className="career-empty-text">
              Preparing your career journey.
            </p>

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

        <header className="career-header">

          <div className="career-eyebrow">
            Career Journey
          </div>

          <h1 className="career-title">
            {role?.title || "Career Roadmap"}
          </h1>

          <p className="career-subtitle">
            Follow this step-by-step roadmap to build the
            skills needed for this career.
          </p>

        </header>

        <hr className="career-divider" />

        <section className="career-section">

          <div className="career-section-header">
            <h2 className="career-section-title">
              Your Roadmap
            </h2>

            <p className="career-section-description">
              Learn step by step, build projects and move
              closer to becoming job ready.
            </p>
          </div>

          {roadmaps.length === 0 ? (
            <div className="career-empty">

              <h3 className="career-empty-title">
                No Roadmap Available
              </h3>

              <p className="career-empty-text">
                A roadmap for this career has not been
                added yet.
              </p>

            </div>
          ) : (
            <div className="roadmap-list">

              {[...roadmaps]
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

      </div>
    </div>
  );
}

export default RoadmapPage;
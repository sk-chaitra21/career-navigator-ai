import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import "../styles/career-pages.css";

function SkillPage() {
  const { skillId } = useParams();
  const navigate = useNavigate();

  const [skill, setSkill] = useState(null);
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSkill();
  }, [skillId]);

  const fetchSkill = async () => {
    try {
      setLoading(true);
      setError("");

      const skillResponse = await api.get(
        `/skills/${skillId}`
      );

      const courseResponse = await api.get(
        `/skills/${skillId}/courses`
      );

      setSkill(skillResponse.data);
      setCourses(courseResponse.data);
    } catch (error) {
      console.error("Skill Error:", error);

      setError("Unable to load skill.");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     LOADING
     ========================= */

  if (loading) {
    return (
      <div className="career-page">
        <div className="career-container">

          <div className="career-empty">
            <h2 className="career-empty-title">
              Loading...
            </h2>

            <p className="career-empty-text">
              Preparing your learning resources.
            </p>
          </div>

        </div>
      </div>
    );
  }

  /* =========================
     ERROR
     ========================= */

  if (error) {
    return (
      <div className="career-page">
        <div className="career-container">

          <div className="career-empty">

            <h2 className="career-empty-title">
              {error}
            </h2>

            <p className="career-empty-text">
              Something went wrong while loading this skill.
            </p>

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

  /* =========================
     MAIN PAGE
     ========================= */

  return (
    <div className="career-page">

      <div className="career-container">

        {/* =========================
            BACK BUTTON
            ========================= */}

        <button
          className="career-back"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>


        {/* =========================
            SKILL HEADER
            ========================= */}

        <header className="career-header">

          <div className="career-eyebrow">
            Skill
          </div>

          <h1 className="career-title">
            {skill?.name}
          </h1>

          <p className="career-subtitle">
            {skill?.description ||
              `Learn ${skill?.name} and build the skills needed for your career.`}
          </p>

        </header>


        {/* =========================
            DIVIDER
            ========================= */}

        <hr className="career-divider" />


        {/* =========================
            COURSES
            ========================= */}

        <section className="career-section">

          <div className="career-section-header">

            <h2 className="career-section-title">
              Recommended Courses
            </h2>

            <p className="career-section-description">
              Learn {skill?.name} using these recommended
              courses and resources.
            </p>

          </div>


          {/* NO COURSES */}

          {courses.length === 0 ? (

            <div className="career-empty">

              <h3 className="career-empty-title">
                No courses available yet.
              </h3>

              <p className="career-empty-text">
                Courses for this skill will be added soon.
              </p>

            </div>

          ) : (

            /* COURSES */

            <div className="course-grid">

              {courses.map((course) => (

                <article
                  key={course.id}
                  className="course-card"
                >

                  <h3 className="course-title">
                    {course.title}
                  </h3>


                  {course.description && (
                    <p className="course-description">
                      {course.description}
                    </p>
                  )}


                  {course.url && (
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noreferrer"
                      className="course-link"
                    >
                      Start Course →
                    </a>
                  )}

                </article>

              ))}

            </div>

          )}

        </section>

      </div>

    </div>
  );
}

export default SkillPage;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import api from "../api/api";

import "../styles/recommendation.css";


function RecommendationPage() {

  const navigate = useNavigate();

  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);


  // Load skills when page opens
  useEffect(() => {
    fetchSkills();
  }, []);


  // Get all skills from backend
  const fetchSkills = async () => {

    try {

      const response = await api.get("/skills");

      setSkills(response.data);

    } catch (error) {

      console.error(
        "Failed to load skills:",
        error
      );

      alert("Failed to load skills");
    }
  };


  // Select / unselect skill
  const handleSkillChange = (skillName) => {

    setSelectedSkills((previousSkills) => {

      if (previousSkills.includes(skillName)) {

        return previousSkills.filter(
          (skill) => skill !== skillName
        );
      }

      return [
        ...previousSkills,
        skillName
      ];
    });
  };


  // Get career recommendations
  const getRecommendations = async () => {

    if (selectedSkills.length === 0) {

      alert("Please select at least one skill");

      return;
    }


    try {

      setLoading(true);

      const response = await api.post(
        "/recommend",
        {
          skills: selectedSkills
        }
      );

      setRecommendations(response.data);

    } catch (error) {

      console.error(
        "Recommendation error:",
        error
      );

      if (error.response) {

        alert(
          error.response.data.detail ||
          "Failed to get recommendations"
        );

      } else {

        alert(
          "Failed to connect to server"
        );
      }

    } finally {

      setLoading(false);
    }
  };


  return (

    <MainLayout>

      <div className="recommendation-page">


        {/* =========================
            HEADER
        ========================== */}

        <div className="recommendation-header">

          <h1>
            🤖 AI Career Advisor
          </h1>

          <p>
            Select the skills you already know
            and discover careers that match
            your profile.
          </p>

        </div>


        {/* =========================
            SKILL SELECTION
        ========================== */}

        <div className="recommendation-card">

          <h2>
            Select Your Skills
          </h2>

          <p className="section-description">
            Choose all the skills you currently
            know.
          </p>


          {skills.length === 0 ? (

            <p>
              Loading skills...
            </p>

          ) : (

            <div className="skills-grid">

              {skills.map((skill) => (

                <label
                  key={skill.id}
                  className={`skill-option ${
                    selectedSkills.includes(
                      skill.name
                    )
                      ? "selected"
                      : ""
                  }`}
                >

                  <input
                    type="checkbox"

                    checked={selectedSkills.includes(
                      skill.name
                    )}

                    onChange={() =>
                      handleSkillChange(
                        skill.name
                      )
                    }
                  />

                  <span>
                    {skill.name}
                  </span>

                </label>

              ))}

            </div>

          )}


          {/* Selected skills count */}

          <p className="selected-count">

            {selectedSkills.length} skill
            {selectedSkills.length !== 1
              ? "s"
              : ""} selected

          </p>


          {/* Recommend button */}

          <button
            className="recommend-button"

            onClick={getRecommendations}

            disabled={loading}
          >

            {loading
              ? "Finding Careers..."
              : "🤖 Recommend Careers"}

          </button>

        </div>


        {/* =========================
            RECOMMENDATION RESULTS
        ========================== */}

        {recommendations.length > 0 && (

          <div className="results-section">

            <h2>
              Recommended Careers
            </h2>

            <p className="section-description">
              Based on the skills you selected.
            </p>


            <div className="recommendation-results">

              {recommendations.map(
                (recommendation) => (

                  <div
                    className="career-result-card"
                    key={recommendation.role_id}
                  >


                    {/* Career header */}

                    <div className="career-result-header">

                      <div>

                        <h2>
                          ⭐ {recommendation.role}
                        </h2>

                        <p>
                          {
                            recommendation.match_percentage
                          }% Match
                        </p>

                      </div>


                      {/* Match percentage */}

                      <div className="match-circle">

                        {
                          recommendation.match_percentage
                        }%

                      </div>

                    </div>


                    {/* Progress bar */}

                    <div className="match-bar">

                      <div
                        className="match-progress"

                        style={{
                          width: `${recommendation.match_percentage}%`
                        }}
                      />

                    </div>


                    {/* Matched skills */}

                    <h3>
                      Matched Skills
                    </h3>


                    <div className="matched-skills">

                      {recommendation.matched_skills.map(
                        (skill) => (

                          <span key={skill}>
                            ✓ {skill}
                          </span>

                        )
                      )}

                    </div>


                    {/* Explore role */}

                    <button
                      className="view-role-button"

                      onClick={() =>
                        navigate(
                          `/role/${recommendation.role_id}`
                        )
                      }
                    >

                      Explore Career →

                    </button>

                  </div>

                )
              )}

            </div>

          </div>

        )}

      </div>

    </MainLayout>
  );
}


export default RecommendationPage;
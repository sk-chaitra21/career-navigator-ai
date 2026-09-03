import { useState } from "react";
import api from "../api/api";
import "../styles/ai-advisor.css";

function AICareerAdvisor() {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [advice, setAdvice] = useState(null);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getAdvice = async () => {
    if (loading) return;

    setErrorMessage("");
    setAdvice(null);

    if (!role.trim()) {
      setErrorMessage("Please enter your target career role.");
      return;
    }

    if (!skills.trim()) {
      setErrorMessage("Please enter your current skills.");
      return;
    }

    try {
      setLoading(true);

      const skillList = skills
        .split(",")
        .map((skill) => {
          const cleaned = skill.trim();

          // Normalize common spelling
          if (cleaned.toLowerCase() === "fast api") {
            return "FastAPI";
          }

          return cleaned;
        })
        .filter((skill) => skill.length > 0);

      console.log("=================================");
      console.log("AI CAREER ADVISOR REQUEST");
      console.log("Role:", role.trim());
      console.log("Skills:", skillList);
      console.log("=================================");

      const response = await api.post(
        `/ai/career-advice?role=${encodeURIComponent(role.trim())}`,
        skillList,
        {
          timeout: 120000,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("=================================");
      console.log("AI BACKEND RESPONSE");
      console.log(response.data);
      console.log("=================================");

      const returnedAdvice = response.data?.advice;

      if (
        returnedAdvice === undefined ||
        returnedAdvice === null
      ) {
        setErrorMessage(
          "The AI response was received, but no assessment was returned."
        );
        return;
      }

      setAdvice(returnedAdvice);

    } catch (error) {
      console.error("=================================");
      console.error("AI ADVISOR ERROR");
      console.error(error);
      console.error("=================================");

      if (error.code === "ECONNABORTED") {
        setErrorMessage(
          "The AI request took too long. Please try again."
        );
      } else if (error.response) {
        setErrorMessage(
          error.response.data?.detail ||
          "The AI service returned an error."
        );
      } else if (error.request) {
        setErrorMessage(
          "The backend did not respond. Please make sure FastAPI is running."
        );
      } else {
        setErrorMessage(
          error.message ||
          "Something went wrong while generating your assessment."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-advisor-page">

      {/* =====================================
          HERO
      ===================================== */}

      <section className="ai-advisor-hero">

        <div className="ai-advisor-badge">
          AI
          <br />
          CAREER
          <br />
          ADVISOR
        </div>

        <div className="ai-advisor-hero-content">
          <h1>
            Build
            <br />
            your
            <br />
            next
            <br />
            <span>career move.</span>
          </h1>
        </div>

        <p className="ai-advisor-hero-description">
          Tell us your target career and current skills.
          Our AI will analyze where you are and suggest
          what you should learn next.
        </p>

      </section>


      {/* =====================================
          INPUT CARD
      ===================================== */}

      <section className="ai-advisor-card">

        <div className="ai-field">

          <label>
            Target Career Role
          </label>

          <span>
            What role are you aiming for?
          </span>

          <input
            type="text"
            placeholder="Example: Backend Developer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={loading}
          />

        </div>


        <div className="ai-field">

          <label>
            Your Current Skills
          </label>

          <span>
            Separate multiple skills with commas.
          </span>

          <input
            type="text"
            placeholder="Example: Python, SQL, FastAPI, Git"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            disabled={loading}
          />

        </div>


        {/* ERROR */}

        {errorMessage && (
          <div className="ai-error">

            <strong>
              Something went wrong
            </strong>

            <p>
              {errorMessage}
            </p>

          </div>
        )}


        {/* BUTTON */}

        <button
          className="ai-analyze-button"
          onClick={getAdvice}
          disabled={loading}
        >

          {loading ? (
            <>
              <span className="ai-spinner"></span>
              Analyzing...
            </>
          ) : (
            <>
              🤖 Analyze My Career
            </>
          )}

        </button>

      </section>


      {/* =====================================
          AI RESULT
      ===================================== */}

      {advice && typeof advice === "object" && (

        <section className="ai-advice-card">

          <div className="ai-result-label">
            AI CAREER ASSESSMENT
          </div>

          <h2>
            Your next career move
          </h2>


          {/* READINESS */}

          {advice.readiness && (
            <div className="ai-readiness">

              <div className="ai-section-heading">
                🎯 Career Readiness
              </div>

              <p>
                {advice.readiness}
              </p>

            </div>
          )}


          {/* STRENGTHS */}

          {Array.isArray(advice.strengths) &&
            advice.strengths.length > 0 && (

              <div className="ai-result-section">

                <div className="ai-section-heading">
                  💪 Your Strengths
                </div>

                <div className="ai-result-list">

                  {advice.strengths.map((item, index) => (
                    <div
                      className="ai-result-item"
                      key={index}
                    >
                      <span className="ai-item-number">
                        0{index + 1}
                      </span>

                      <span>
                        {item}
                      </span>
                    </div>
                  ))}

                </div>

              </div>
            )}


          {/* SKILL GAPS */}

          {Array.isArray(advice.skill_gaps) &&
            advice.skill_gaps.length > 0 && (

              <div className="ai-result-section">

                <div className="ai-section-heading">
                  📚 Skills to Develop
                </div>

                <div className="ai-result-list">

                  {advice.skill_gaps.map((item, index) => (
                    <div
                      className="ai-result-item"
                      key={index}
                    >
                      <span className="ai-item-number">
                        0{index + 1}
                      </span>

                      <span>
                        {item}
                      </span>
                    </div>
                  ))}

                </div>

              </div>
            )}


          {/* NEXT STEPS */}

          {Array.isArray(advice.next_steps) &&
            advice.next_steps.length > 0 && (

              <div className="ai-result-section">

                <div className="ai-section-heading">
                  🚀 Your Next Steps
                </div>

                <div className="ai-result-list">

                  {advice.next_steps.map((item, index) => (
                    <div
                      className="ai-result-item"
                      key={index}
                    >
                      <span className="ai-item-number">
                        0{index + 1}
                      </span>

                      <span>
                        {item}
                      </span>
                    </div>
                  ))}

                </div>

              </div>
            )}


          {/* ACTION PLAN */}

          {Array.isArray(advice.action_plan) &&
            advice.action_plan.length > 0 && (

              <div className="ai-result-section">

                <div className="ai-section-heading">
                  🛠 Action Plan
                </div>

                <div className="ai-result-list">

                  {advice.action_plan.map((item, index) => (
                    <div
                      className="ai-result-item"
                      key={index}
                    >
                      <span className="ai-item-number">
                        0{index + 1}
                      </span>

                      <span>
                        {item}
                      </span>
                    </div>
                  ))}

                </div>

              </div>
            )}


          {/* FINAL ADVICE */}

          {advice.advice && (

            <div className="ai-final-advice">

              <div className="ai-final-label">
                ✨ AI ADVICE
              </div>

              <p>
                {advice.advice}
              </p>

            </div>

          )}

        </section>

      )}


      {/* FALLBACK FOR STRING RESPONSE */}

      {advice && typeof advice === "string" && (

        <section className="ai-advice-card">

          <div className="ai-result-label">
            AI CAREER ASSESSMENT
          </div>

          <h2>
            Your next career move
          </h2>

          <div className="ai-advice-content">
            {advice}
          </div>

        </section>

      )}

    </div>
  );
}

export default AICareerAdvisor;
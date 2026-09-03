import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/api";
import "../styles/role-details.css";

function RoleDetails() {
  const { roleId } = useParams();
  const navigate = useNavigate();

  // ========================================
  // STATE
  // ========================================

  const [role, setRole] = useState(null);
  const [skills, setSkills] = useState([]);

  const [completedSkills, setCompletedSkills] = useState([]);

  const [loading, setLoading] = useState(true);
  const [progressLoading, setProgressLoading] = useState(false);

  const [aiLoading, setAiLoading] = useState(false);
  const [skillGap, setSkillGap] = useState(null);

  // ========================================
  // LOAD DATA
  // ========================================

  useEffect(() => {
    loadRoleData();
  }, [roleId]);

  const loadRoleData = async () => {
    setLoading(true);

    await Promise.all([
      fetchRole(),
      fetchSkills(),
      fetchProgress(),
    ]);

    setLoading(false);
  };

  // ========================================
  // GET ROLE
  // ========================================

  const fetchRole = async () => {
    try {
      const response = await api.get(`/roles/${roleId}`);

      setRole(response.data);
    } catch (error) {
      console.error("Failed to load role:", error);
    }
  };

  // ========================================
  // GET SKILLS
  // ========================================

  const fetchSkills = async () => {
    try {
      const response = await api.get(
        `/roles/${roleId}/skills`
      );

      setSkills(response.data);
    } catch (error) {
      console.error("Failed to load skills:", error);
    }
  };

  // ========================================
  // GET PROGRESS
  // ========================================

  const fetchProgress = async () => {
    try {
      const response = await api.get(
        `/progress/${roleId}`
      );

      const completed = response.data
        .filter((item) => item.completed === true)
        .map((item) => item.skill_id);

      setCompletedSkills(completed);
    } catch (error) {
      console.error(
        "Failed to load progress:",
        error
      );

      if (error.response?.status === 401) {
        console.log("User is not authenticated.");
      }
    }
  };

  // ========================================
  // TOGGLE SKILL
  // ========================================

  const toggleSkill = async (skillId) => {
    const isCompleted =
      completedSkills.includes(skillId);

    const newCompletedStatus = !isCompleted;

    try {
      setProgressLoading(true);

      await api.put("/progress", {
        role_id: Number(roleId),
        skill_id: skillId,
        completed: newCompletedStatus,
      });

      if (newCompletedStatus) {
        setCompletedSkills((previous) => [
          ...previous,
          skillId,
        ]);
      } else {
        setCompletedSkills((previous) =>
          previous.filter(
            (id) => id !== skillId
          )
        );
      }
    } catch (error) {
      console.error(
        "Failed to update progress:",
        error
      );

      if (error.response?.status === 401) {
        alert(
          "Your login session has expired. Please login again."
        );

        localStorage.removeItem("token");
        navigate("/login");

        return;
      }

      alert(
        error.response?.data?.detail ||
          "Failed to update progress"
      );
    } finally {
      setProgressLoading(false);
    }
  };

  // ========================================
  // SAVE CAREER
  // ========================================

  const saveCareer = async () => {
    try {
      await api.post(
        `/saved-roles/${roleId}`
      );

      alert("Career saved successfully ❤️");
    } catch (error) {
      console.error(
        "Failed to save career:",
        error
      );

      if (error.response?.status === 401) {
        alert(
          "Please login to save careers."
        );

        navigate("/login");
        return;
      }

      alert(
        error.response?.data?.detail ||
          "Failed to save career"
      );
    }
  };

  // ========================================
  // AI SKILL GAP
  // ========================================

  const analyzeSkillGap = async () => {
    try {
      setAiLoading(true);
      setSkillGap(null);

      console.log(
        "Starting AI Skill Gap Analysis..."
      );

      console.log("Role ID:", roleId);

      const response = await api.get(
        `/ai/skill-gap/${roleId}`
      );

      console.log(
        "AI Skill Gap Response:",
        response.data
      );

      const data = response.data;

      if (!data) {
        throw new Error(
          "AI returned an empty response"
        );
      }

      /*
        Expected backend response:

        {
          role: "Backend Developer",
          skills: [...],
          advice: {
            readiness: "...",
            strengths: [...],
            skill_gaps: [...],
            next_steps: [...],
            action_plan: [...],
            advice: "..."
          }
        }
      */

      if (
        data.advice &&
        typeof data.advice === "object"
      ) {
        setSkillGap(data);
        return;
      }

      /*
        Fallback if advice comes as text
      */

      if (
        data.advice &&
        typeof data.advice === "string"
      ) {
        setSkillGap({
          ...data,

          advice: {
            readiness:
              "AI analysis generated successfully.",

            strengths: [],

            skill_gaps: [],

            next_steps: [],

            action_plan: [],

            advice: data.advice,
          },
        });

        return;
      }

      throw new Error(
        "Unexpected AI response format"
      );
    } catch (error) {
      console.error(
        "========== AI SKILL GAP ERROR =========="
      );

      console.error(
        "Full error:",
        error
      );

      console.error(
        "Status:",
        error.response?.status
      );

      console.error(
        "Response:",
        error.response?.data
      );

      console.error(
        "Message:",
        error.message
      );

      console.error(
        "========================================"
      );

      if (error.response?.status === 401) {
        alert(
          "Your login session has expired. Please login again."
        );

        localStorage.removeItem("token");

        navigate("/login");

        return;
      }

      const backendMessage =
        error.response?.data?.detail;

      alert(
        backendMessage ||
          error.message ||
          "AI Skill Gap Analysis failed."
      );
    } finally {
      setAiLoading(false);
    }
  };

  // ========================================
  // PROGRESS
  // ========================================

  const progressPercentage =
    skills.length > 0
      ? Math.round(
          (completedSkills.length /
            skills.length) *
            100
        )
      : 0;

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div
        style={{
          padding: "60px",
          textAlign: "center",
        }}
      >
        <h2>Loading career path...</h2>

        <p
          style={{
            color: "#64748b",
          }}
        >
          Preparing your career journey.
        </p>
      </div>
    );
  }

  // ========================================
  // ROLE NOT FOUND
  // ========================================

  if (!role) {
    return (
      <div
        style={{
          padding: "60px",
          textAlign: "center",
        }}
      >
        <h2>Career role not found</h2>

        <button
          onClick={() =>
            navigate("/dashboard")
          }
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  // ========================================
  // AI DATA
  // ========================================

  const aiAdvice =
    skillGap?.advice || {};

  // ========================================
  // UI
  // ========================================

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "35px",
      }}
    >
      {/* ========================================
          HEADER
      ======================================== */}

      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            color: "#4f46e5",
            fontWeight: "600",
            marginBottom: "8px",
          }}
        >
          🎯 Career Path
        </div>

        <h1
          style={{
            margin: "0 0 15px",
            fontSize: "42px",
            color: "#111827",
          }}
        >
          {role.title}
        </h1>

        <p
          style={{
            fontSize: "17px",
            color: "#64748b",
            lineHeight: "1.7",
            maxWidth: "750px",
          }}
        >
          {role.description}
        </p>
      </div>

      {/* ========================================
          QUICK INFORMATION
      ======================================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "15px",
          marginBottom: "25px",
        }}
      >
        <div className="role-info-card">
          <span>💰</span>

          <small>Salary Range</small>

          <strong>
            {role.salary || "Not specified"}
          </strong>
        </div>

        <div className="role-info-card">
          <span>📚</span>

          <small>Required Skills</small>

          <strong>
            {skills.length} skills
          </strong>
        </div>

        <div className="role-info-card">
          <span>📈</span>

          <small>Your Progress</small>

          <strong>
            {progressPercentage}%
          </strong>
        </div>
      </div>

      {/* ========================================
          ACTION BUTTONS
      ======================================== */}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "35px",
        }}
      >
        <button
          onClick={saveCareer}
          className="role-action-button"
        >
          ❤️ Save Career
        </button>

        <button
          onClick={() =>
            navigate(
              `/roadmap/${role.id}`
            )
          }
          className="role-action-button"
        >
          🗺 View Roadmap
        </button>

        <button
          onClick={() =>
            navigate(
              `/companies/${role.id}`
            )
          }
          className="role-action-button"
        >
          🏢 Top Companies
        </button>

        <button
          onClick={analyzeSkillGap}
          disabled={aiLoading}
          className="role-action-button ai-button"
        >
          {aiLoading
            ? "🤖 Analyzing..."
            : "✨ Analyze My Skill Gap"}
        </button>
      </div>

      {/* ========================================
          PROGRESS SECTION
      ======================================== */}

      <div
        style={{
          background: "#ffffff",
          borderRadius: "18px",
          padding: "25px",
          marginBottom: "35px",
          border: "1px solid #e2e8f0",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <div>
            <small
              style={{
                color: "#4f46e5",
                fontWeight: "600",
              }}
            >
              YOUR JOURNEY
            </small>

            <h2
              style={{
                margin: "5px 0 0",
                color: "#111827",
              }}
            >
              Learning Progress
            </h2>
          </div>

          <strong
            style={{
              fontSize: "25px",
              color: "#4f46e5",
            }}
          >
            {progressPercentage}%
          </strong>
        </div>

        <div
          style={{
            width: "100%",
            height: "12px",
            background: "#e2e8f0",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progressPercentage}%`,
              height: "100%",
              background:
                "linear-gradient(90deg, #4f46e5, #7c3aed)",
              borderRadius: "20px",
              transition:
                "width 0.3s ease",
            }}
          />
        </div>

        <p
          style={{
            marginTop: "12px",
            color: "#64748b",
          }}
        >
          {completedSkills.length} of{" "}
          {skills.length} skills completed
        </p>

        {progressPercentage === 100 && (
          <p
            style={{
              color: "#16a34a",
              fontWeight: "600",
            }}
          >
            🎉 Excellent! You completed all
            required skills.
          </p>
        )}

        {progressPercentage > 0 &&
          progressPercentage < 100 && (
            <p
              style={{
                color: "#64748b",
              }}
            >
              Keep going — you're making
              progress!
            </p>
          )}
      </div>

      {/* ========================================
          AI SKILL GAP RESULT
      ======================================== */}

      {skillGap && (
        <div
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            padding: "30px",
            marginBottom: "35px",
            border:
              "1px solid rgba(99,102,241,0.25)",
            boxShadow:
              "0 10px 30px rgba(79,70,229,0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div>
              <small
                style={{
                  color: "#4f46e5",
                  fontWeight: "700",
                }}
              >
                AI CAREER INSIGHT
              </small>

              <h2
                style={{
                  margin: "5px 0 0",
                  color: "#111827",
                }}
              >
                Your Skill Gap
              </h2>
            </div>

            <span
              style={{
                fontSize: "30px",
              }}
            >
              🤖
            </span>
          </div>

          {/* READINESS */}

          {aiAdvice.readiness && (
            <div
              style={{
                background: "#eef2ff",
                padding: "18px",
                borderRadius: "12px",
                marginBottom: "20px",
              }}
            >
              <strong
                style={{
                  display: "block",
                  marginBottom: "6px",
                  color: "#3730a3",
                }}
              >
                🎯 Readiness
              </strong>

              <p
                style={{
                  color: "#4338ca",
                  margin: 0,
                  lineHeight: "1.6",
                }}
              >
                {aiAdvice.readiness}
              </p>
            </div>
          )}

          {/* STRENGTHS */}

          {Array.isArray(
            aiAdvice.strengths
          ) &&
            aiAdvice.strengths.length >
              0 && (
              <div
                style={{
                  marginBottom: "22px",
                }}
              >
                <h3>💪 Strengths</h3>

                <ul
                  style={{
                    lineHeight: "1.8",
                    color: "#475569",
                  }}
                >
                  {aiAdvice.strengths.map(
                    (item, index) => (
                      <li key={index}>
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

          {/* SKILL GAPS */}

          {Array.isArray(
            aiAdvice.skill_gaps
          ) &&
            aiAdvice.skill_gaps.length >
              0 && (
              <div
                style={{
                  marginBottom: "22px",
                }}
              >
                <h3>📌 Skill Gaps</h3>

                <ul
                  style={{
                    lineHeight: "1.8",
                    color: "#475569",
                  }}
                >
                  {aiAdvice.skill_gaps.map(
                    (item, index) => (
                      <li key={index}>
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

          {/* NEXT STEPS */}

          {Array.isArray(
            aiAdvice.next_steps
          ) &&
            aiAdvice.next_steps.length >
              0 && (
              <div
                style={{
                  marginBottom: "22px",
                }}
              >
                <h3>🚀 Next Steps</h3>

                <ol
                  style={{
                    lineHeight: "1.8",
                    color: "#475569",
                  }}
                >
                  {aiAdvice.next_steps.map(
                    (item, index) => (
                      <li key={index}>
                        {item}
                      </li>
                    )
                  )}
                </ol>
              </div>
            )}

          {/* ACTION PLAN */}

          {Array.isArray(
            aiAdvice.action_plan
          ) &&
            aiAdvice.action_plan.length >
              0 && (
              <div
                style={{
                  marginBottom: "22px",
                }}
              >
                <h3>🛠 Action Plan</h3>

                <ul
                  style={{
                    lineHeight: "1.8",
                    color: "#475569",
                  }}
                >
                  {aiAdvice.action_plan.map(
                    (item, index) => (
                      <li key={index}>
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

          {/* FINAL ADVICE */}

          {aiAdvice.advice && (
            <div
              style={{
                background: "#f8fafc",
                borderLeft:
                  "4px solid #4f46e5",
                padding: "18px",
                borderRadius: "8px",
              }}
            >
              <strong>
                💡 AI Advice
              </strong>

              <p
                style={{
                  marginTop: "8px",
                  color: "#475569",
                  lineHeight: "1.7",
                }}
              >
                {aiAdvice.advice}
              </p>
            </div>
          )}
        </div>
      )}

      {/* ========================================
          REQUIRED SKILLS
      ======================================== */}

      <div>
        <small
          style={{
            color: "#4f46e5",
            fontWeight: "600",
          }}
        >
          BUILD YOUR FOUNDATION
        </small>

        <h2
          style={{
            margin: "5px 0",
            fontSize: "30px",
            color: "#111827",
          }}
        >
          Required Skills
        </h2>

        <p
          style={{
            color: "#64748b",
            marginBottom: "20px",
          }}
        >
          Track the skills you need for this
          career path.
        </p>

        {skills.length === 0 ? (
          <div
            style={{
              background: "#ffffff",
              padding: "30px",
              borderRadius: "15px",
              textAlign: "center",
              border:
                "1px solid #e2e8f0",
            }}
          >
            <p>
              No skills assigned to this role
              yet.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "15px",
            }}
          >
            {skills.map((skill) => {
              const completed =
                completedSkills.includes(
                  skill.id
                );

              return (
                <div
                  key={skill.id}
                  style={{
                    background:
                      completed
                        ? "#eef2ff"
                        : "#ffffff",

                    border: completed
                      ? "2px solid #6366f1"
                      : "1px solid #e2e8f0",

                    borderRadius: "16px",

                    padding: "20px",

                    transition:
                      "all 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "15px",
                      alignItems:
                        "flex-start",
                    }}
                  >
                    {/* CHECKBOX */}

                    <input
                      type="checkbox"
                      checked={completed}
                      disabled={
                        progressLoading
                      }
                      onChange={() =>
                        toggleSkill(
                          skill.id
                        )
                      }
                      style={{
                        width: "20px",
                        height: "20px",
                        marginTop: "4px",
                        cursor:
                          "pointer",
                      }}
                    />

                    {/* SKILL */}

                    <div
                      style={{
                        flex: 1,
                        cursor:
                          "pointer",
                      }}
                      onClick={() =>
                        navigate(
                          `/courses/${skill.id}`
                        )
                      }
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent:
                            "space-between",
                          alignItems:
                            "center",
                          gap: "10px",
                        }}
                      >
                        <h3
                          style={{
                            margin:
                              "0 0 6px",
                            color:
                              "#111827",
                          }}
                        >
                          {completed
                            ? "✅ "
                            : ""}
                          {skill.name}
                        </h3>

                        {completed && (
                          <span
                            style={{
                              fontSize:
                                "12px",
                              fontWeight:
                                "600",
                              color:
                                "#4f46e5",
                            }}
                          >
                            COMPLETED
                          </span>
                        )}
                      </div>

                      <p
                        style={{
                          margin:
                            "0 0 8px",
                          color:
                            "#64748b",
                          lineHeight:
                            "1.6",
                        }}
                      >
                        {
                          skill.description
                        }
                      </p>

                      <span
                        style={{
                          color:
                            "#4f46e5",
                          fontWeight:
                            "600",
                          fontSize:
                            "14px",
                        }}
                      >
                        Explore Courses →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ========================================
          BOTTOM NAVIGATION
      ======================================== */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          flexWrap: "wrap",
          marginTop: "40px",
          paddingTop: "25px",
          borderTop:
            "1px solid #e2e8f0",
        }}
      >
        <button
          onClick={() =>
            navigate("/dashboard")
          }
        >
          ← Dashboard
        </button>

        <button
          onClick={() =>
            navigate(
              `/roadmap/${role.id}`
            )
          }
        >
          🗺 Continue to Roadmap →
        </button>
      </div>
    </div>
  );
}

export default RoleDetails;
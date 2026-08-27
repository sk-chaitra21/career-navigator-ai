import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../api/api";


function RoleDetails() {

  const { roleId } = useParams();
  const navigate = useNavigate();


  const [role, setRole] = useState(null);
  const [skills, setSkills] = useState([]);

  const [completedSkills, setCompletedSkills] = useState([]);

  const [progressLoading, setProgressLoading] = useState(false);


  // ========================================
  // LOAD ROLE + SKILLS + PROGRESS
  // ========================================

  useEffect(() => {

    fetchRole();
    fetchSkills();
    fetchProgress();

  }, [roleId]);


  // ========================================
  // GET ROLE
  // ========================================

  const fetchRole = async () => {

    try {

      const response = await api.get(
        `/roles/${roleId}`
      );

      setRole(response.data);

    } catch (error) {

      console.error(
        "Failed to load role:",
        error
      );
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

      console.error(
        "Failed to load skills:",
        error
      );
    }
  };


  // ========================================
  // GET EXISTING PROGRESS
  // ========================================

  const fetchProgress = async () => {

    try {

      const response = await api.get(
        `/progress/${roleId}`
      );


      const completed = response.data
        .filter(
          (item) => item.completed === true
        )
        .map(
          (item) => item.skill_id
        );


      setCompletedSkills(completed);

    } catch (error) {

      console.error(
        "Failed to load progress:",
        error
      );
    }
  };


  // ========================================
  // TOGGLE SKILL
  // ========================================

  const toggleSkill = async (
    skillId
  ) => {

    const isCompleted =
      completedSkills.includes(skillId);


    const newCompletedStatus =
      !isCompleted;


    try {

      setProgressLoading(true);


      await api.put(
        "/progress",
        {
          role_id: Number(roleId),
          skill_id: skillId,
          completed: newCompletedStatus
        }
      );


      if (newCompletedStatus) {

        setCompletedSkills(
          (previous) => [
            ...previous,
            skillId
          ]
        );

      } else {

        setCompletedSkills(
          (previous) =>
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

      alert(
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

      alert(
        "Career Saved ❤️"
      );

    } catch (error) {

      console.error(error);

      if (error.response) {

        alert(
          error.response.data.detail ||
          "Failed to save career"
        );
      }
    }
  };


  // ========================================
  // PROGRESS PERCENTAGE
  // ========================================

  const progressPercentage =
    skills.length > 0
      ? Math.round(
          (
            completedSkills.length /
            skills.length
          ) * 100
        )
      : 0;


  // ========================================
  // LOADING
  // ========================================

  if (!role) {

    return (
      <h2>
        Loading...
      </h2>
    );
  }


  // ========================================
  // UI
  // ========================================

  return (

    <div
      style={{
        padding: "40px",
        maxWidth: "900px",
        margin: "auto"
      }}
    >


      {/* ROLE INFORMATION */}

      <h1>
        {role.title}
      </h1>


      <p>
        {role.description}
      </p>


      <h3>
        Salary
      </h3>


      <p>
        {role.salary}
      </p>


      {/* ACTION BUTTONS */}

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "25px",
          marginBottom: "30px",
          flexWrap: "wrap"
        }}
      >

        <button
          onClick={saveCareer}
        >
          ❤️ Save Career
        </button>


        <button
          onClick={() =>
            navigate(
              `/roadmap/${role.id}`
            )
          }
        >
          🗺 View Roadmap
        </button>


        <button
          onClick={() =>
            navigate(
              `/companies/${role.id}`
            )
          }
        >
          🏢 Top Companies
        </button>

      </div>


      <hr />


      {/* PROGRESS */}

      <div
        style={{
          marginTop: "30px",
          marginBottom: "35px"
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >

          <h2>
            Learning Progress
          </h2>

          <strong>
            {progressPercentage}%
          </strong>

        </div>


        <div
          style={{
            width: "100%",
            height: "12px",
            backgroundColor: "#e2e8f0",
            borderRadius: "10px",
            overflow: "hidden"
          }}
        >

          <div
            style={{
              width: `${progressPercentage}%`,
              height: "100%",
              backgroundColor: "#4f46e5",
              borderRadius: "10px",
              transition: "width 0.3s ease"
            }}
          />

        </div>


        <p
          style={{
            color: "#64748b",
            marginTop: "8px"
          }}
        >
          {completedSkills.length} of{" "}
          {skills.length} skills completed
        </p>

      </div>


      {/* REQUIRED SKILLS */}

      <h2>
        Required Skills
      </h2>


      {skills.length === 0 ? (

        <p>
          No skills assigned.
        </p>

      ) : (

        skills.map((skill) => {

          const completed =
            completedSkills.includes(
              skill.id
            );


          return (

            <div
              key={skill.id}
              style={{
                border: completed
                  ? "2px solid #4f46e5"
                  : "1px solid #ddd",

                borderRadius: "10px",

                padding: "15px",

                marginBottom: "15px",

                backgroundColor:
                  completed
                    ? "#eef2ff"
                    : "#ffffff"
              }}
            >

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px"
                }}
              >

                {/* CHECKBOX */}

                <input
                  type="checkbox"

                  checked={completed}

                  disabled={progressLoading}

                  onChange={() =>
                    toggleSkill(
                      skill.id
                    )
                  }

                  style={{
                    marginTop: "5px",
                    width: "18px",
                    height: "18px",
                    cursor: "pointer"
                  }}
                />


                {/* SKILL CONTENT */}

                <div
                  onClick={() =>
                    navigate(
                      `/courses/${skill.id}`
                    )
                  }

                  style={{
                    flex: 1,
                    cursor: "pointer"
                  }}
                >

                  <h3
                    style={{
                      marginTop: 0
                    }}
                  >
                    {completed
                      ? "✅ "
                      : ""}
                    {skill.name}
                  </h3>

                  <p>
                    {skill.description}
                  </p>

                  <small
                    style={{
                      color: "#4f46e5"
                    }}
                  >
                    View Courses →
                  </small>

                </div>

              </div>

            </div>

          );

        })

      )}

    </div>

  );
}


export default RoleDetails;
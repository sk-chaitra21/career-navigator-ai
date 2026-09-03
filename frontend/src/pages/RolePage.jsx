import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/career-pages.css";

function RolePage() {
  const { domainId } = useParams();
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);
  const [technologyPaths, setTechnologyPaths] = useState({});
  const [expandedRole, setExpandedRole] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, [domainId]);

  const fetchRoles = async () => {
    try {
      const response = await api.get(`/roles/domain/${domainId}`);
      setRoles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTechnologyPaths = async (roleId) => {
    try {
      const response = await api.get(
        `/technology-paths/role/${roleId}`
      );

      setTechnologyPaths((prev) => ({
        ...prev,
        [roleId]: response.data,
      }));

      setExpandedRole(roleId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRoleClick = (roleId) => {
    if (expandedRole === roleId) {
      setExpandedRole(null);
      return;
    }

    if (technologyPaths[roleId]) {
      setExpandedRole(roleId);
      return;
    }

    fetchTechnologyPaths(roleId);
  };

  return (
    <div className="career-page">
      <div className="career-container">

        <header className="career-header">
          <div className="career-eyebrow">
            Explore Careers
          </div>

          <h1 className="career-title">
            Career Roles
          </h1>

          <p className="career-subtitle">
            Choose a role to explore its technology paths,
            skills and learning journey.
          </p>
        </header>

        {roles.length === 0 ? (
          <div className="career-empty">
            <h3 className="career-empty-title">
              No Roles Found
            </h3>

            <p className="career-empty-text">
              There are no career roles available for this domain yet.
            </p>
          </div>
        ) : (
          <div className="role-list">

            {roles.map((role) => (
              <div
                key={role.id}
                className="role-wrapper"
              >

                {/* ROLE */}
                <div
                  className="role-card"
                  onClick={() => handleRoleClick(role.id)}
                >
                  <div className="role-card-top">

                    <div>
                      <h2 className="role-card-title">
                        {role.title}
                      </h2>

                      <p className="role-card-description">
                        {role.description}
                      </p>

                      <p className="role-salary">
                        Salary · {role.salary}
                      </p>
                    </div>

                    <span className="role-arrow">
                      {expandedRole === role.id
                        ? "↑"
                        : "↓"}
                    </span>

                  </div>
                </div>

                {/* TECHNOLOGY PATHS */}
                {expandedRole === role.id &&
                  technologyPaths[role.id] && (
                    <div className="technology-paths">

                      <h3 className="technology-paths-title">
                        Technology Paths
                      </h3>

                      {technologyPaths[role.id].length === 0 ? (
                        <div className="career-empty">
                          <p className="career-empty-text">
                            No technology paths available yet.
                          </p>
                        </div>
                      ) : (
                        <div className="technology-path-list">

                          {technologyPaths[role.id].map(
                            (path) => (
                              <div
                                key={path.id}
                                className="technology-path-card"
                                onClick={() =>
                                  navigate(
                                    `/technology-path/${path.id}`
                                  )
                                }
                              >
                                <h3 className="technology-path-name">
                                  {path.name}
                                </h3>

                                <p className="technology-path-link">
                                  Explore skills, resources
                                  and roadmap →
                                </p>
                              </div>
                            )
                          )}

                        </div>
                      )}

                    </div>
                  )}

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default RolePage;
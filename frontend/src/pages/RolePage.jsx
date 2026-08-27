import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

function RolePage() {
  const { domainId } = useParams();
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchRoles();
  }, [domainId]);

  const fetchRoles = async () => {
    try {
      const response = await api.get(`/roles/domain/${domainId}`);

      console.log(response.data);

      setRoles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        Career Roles
      </h1>

      {roles.length === 0 ? (
        <h3>No Roles Found</h3>
      ) : (
        roles.map((role) => (
          <div
            key={role.id}
            onClick={() => navigate(`/role/${role.id}`)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "25px",
              marginBottom: "20px",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              transition: "0.3s",
            }}
          >
            <h2>{role.title}</h2>

            <p>{role.description}</p>

            <p>
              <strong>Salary:</strong> {role.salary}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default RolePage;
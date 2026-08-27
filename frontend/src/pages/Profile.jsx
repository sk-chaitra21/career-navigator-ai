import { useEffect, useState } from "react";
import api from "../api/api";

function Profile() {
  const [savedRoles, setSavedRoles] = useState([]);

  useEffect(() => {
    fetchSavedRoles();
  }, []);

  const fetchSavedRoles = async () => {
    try {
      const response = await api.get("/saved-roles");
      setSavedRoles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeRole = async (roleId) => {
    try {
      await api.delete(`/saved-roles/${roleId}`);

      alert("Role Removed");

      fetchSavedRoles();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "900px",
        margin: "auto",
      }}
    >
      <h1>My Profile</h1>

      <br />

      <h2>Saved Careers ❤️</h2>

      <br />

      {savedRoles.length === 0 ? (
        <h3>No Saved Careers</h3>
      ) : (
        savedRoles.map((role) => (
          <div
            key={role.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <h2>{role.title}</h2>

            <p>{role.description}</p>

            <p>
              <strong>Salary :</strong> {role.salary}
            </p>

            <button
              onClick={() => removeRole(role.id)}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Profile;
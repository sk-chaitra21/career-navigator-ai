import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

function CompanyPage() {
  const { roleId } = useParams();

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, [roleId]);

  const fetchCompanies = async () => {
    try {
      const response = await api.get(`/companies/role/${roleId}`);
      setCompanies(response.data);
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
      <h1>Top Hiring Companies</h1>

      <br />

      {companies.length === 0 ? (
        <h3>No Companies Found</h3>
      ) : (
        companies.map((company) => (
          <div
            key={company.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h2>{company.name}</h2>

            <p>
              <strong>Location:</strong> {company.location}
            </p>

            <p>
              <strong>Website:</strong>{" "}
              <a
                href={company.website}
                target="_blank"
                rel="noreferrer"
              >
                {company.website}
              </a>
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default CompanyPage;
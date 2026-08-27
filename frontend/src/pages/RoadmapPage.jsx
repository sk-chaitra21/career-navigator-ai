import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

function RoadmapPage() {
  const { roleId } = useParams();

  const [roadmaps, setRoadmaps] = useState([]);

  useEffect(() => {
    fetchRoadmap();
  }, [roleId]);

  const fetchRoadmap = async () => {
    try {
      const response = await api.get(`/roadmaps/role/${roleId}`);
      setRoadmaps(response.data);
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
      <h1>Backend Developer Roadmap</h1>

      <br />

      {roadmaps.length === 0 ? (
        <h3>No Roadmap Available</h3>
      ) : (
        roadmaps.map((step) => (
          <div
            key={step.id}
            style={{
              borderLeft: "5px solid #2563eb",
              padding: "20px",
              marginBottom: "20px",
              background: "#f8f9fa",
              borderRadius: "10px",
            }}
          >
            <h2>Step {step.step_order}</h2>

            <h3>{step.title}</h3>

            <p>{step.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default RoadmapPage;
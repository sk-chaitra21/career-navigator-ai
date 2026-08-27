import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

function CoursePage() {
  const { skillId } = useParams();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, [skillId]);

  const fetchCourses = async () => {
    try {
      const response = await api.get(`/courses/skill/${skillId}`);
      setCourses(response.data);
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
      <h1>Recommended Courses</h1>

      <br />

      {courses.length === 0 ? (
        <h3>No Courses Available</h3>
      ) : (
        courses.map((course) => (
          <div
            key={course.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h2>{course.title}</h2>

            <p>
              <strong>Provider:</strong> {course.provider}
            </p>

            <p>
              <strong>Duration:</strong> {course.duration}
            </p>

            <p>
              <strong>Level:</strong> {course.level}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default CoursePage;
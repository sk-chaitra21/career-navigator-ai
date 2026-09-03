import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const params = new URLSearchParams();

      params.append("username", formData.email);
      params.append("password", formData.password);

      const response = await api.post(
        "/login",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      alert("Login Successful!");

      navigate("/dashboard");

    } catch (error) {
      console.error(error);

      if (error.response) {
        console.log(error.response.data);

        alert(
          JSON.stringify(
            error.response.data,
            null,
            2
          )
        );
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-heading">
          <div className="auth-eyebrow">
            CAREER NAVIGATOR AI
          </div>

          <h1>
            Welcome
            <br />
            <span>Back.</span>
          </h1>

          <p>
            Continue your career journey.
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div className="auth-field">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-submit"
          >
            Login →
          </button>

        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;
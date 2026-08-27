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
      // FastAPI OAuth2PasswordRequestForm expects x-www-form-urlencoded
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

      // Save JWT Token
      localStorage.setItem("token", response.data.access_token);

      alert("Login Successful!");

      navigate("/dashboard");

    } catch (error) {
      console.error(error);

      if (error.response) {
        console.log(error.response.data);
        alert(JSON.stringify(error.response.data, null, 2));
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Login
        </button>

      </form>

      <p>
        Don't have an account?
        <Link to="/register"> Register</Link>
      </p>
    </div>
  );
}

export default Login;
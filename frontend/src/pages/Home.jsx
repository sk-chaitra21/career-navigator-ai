import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="app">
      <h1>Career Navigator AI</h1>
      <p>Google Maps for Tech Careers 🚀</p>

      <Link to="/login">
        <button>Login</button>
      </Link>

      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>
  );
}

export default Home;
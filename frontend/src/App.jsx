import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import RolePage from "./pages/RolePage";
import RoleDetails from "./pages/RoleDetails";
import CoursePage from "./pages/CoursePage";
import RoadmapPage from "./pages/RoadmapPage";
import CompanyPage from "./pages/CompanyPage";
import Profile from "./pages/Profile";
import RecommendationPage from "./pages/RecommendationPage";
import AICareerAdvisor from "./pages/AICareerAdvisor";
import TechnologyPathPage from "./pages/TechnologyPathPage";
import SkillPage from "./pages/SkillPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/recommendation"
          element={<RecommendationPage />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/roles/:domainId"
          element={<RolePage />}
        />

        <Route
          path="/role/:roleId"
          element={<RoleDetails />}
        />

        <Route
          path="/courses/:skillId"
          element={<CoursePage />}
        />

        <Route
          path="/roadmap/:roleId"
          element={<RoadmapPage />}
        />

        <Route
          path="/companies/:roleId"
          element={<CompanyPage />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/ai-advisor"
          element={<AICareerAdvisor />}
        />
        <Route
  path="/technology-path/:technologyPathId"
  element={<TechnologyPathPage />}
/>
<Route
  path="/skill/:skillId"
  element={<SkillPage />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
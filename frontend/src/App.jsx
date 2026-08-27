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

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route
  path="/recommendation"
  element={<RecommendationPage />}
/>

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/roles/:domainId" element={<RolePage />} />

        <Route path="/role/:roleId" element={<RoleDetails />} />

        <Route path="/courses/:skillId" element={<CoursePage />} />

        <Route path="/roadmap/:roleId" element={<RoadmapPage />} />

        <Route path="/companies/:roleId" element={<CompanyPage />} />
         
         <Route path="/profile" element={<Profile />} />
          
   
      </Routes>
    </BrowserRouter>
  );
}

export default App;
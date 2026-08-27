import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/layout.css";

function MainLayout({ children }) {
  return (
    <div className="layout">

      <Navbar />

      <div className="layout-body">

        <Sidebar />

        <main className="content">

          {children}

        </main>

      </div>

    </div>
  );
}

export default MainLayout;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSearch } from "react-icons/fa";

import api from "../api/api";

import "./../styles/navbar.css";


function Navbar() {

  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleSearch = async (event) => {

    const value = event.target.value;

    setQuery(value);

    if (value.trim().length === 0) {

      setResults([]);
      setShowResults(false);

      return;
    }


    try {

      setLoading(true);

      const response = await api.get(
        `/search?q=${encodeURIComponent(value)}`
      );

      setResults(response.data.results);

      setShowResults(true);

    } catch (error) {

      console.error(
        "Search failed:",
        error
      );

      setResults([]);
      setShowResults(false);

    } finally {

      setLoading(false);

    }
  };


  const handleResultClick = (result) => {

    setShowResults(false);
    setQuery("");


    if (result.type === "role") {

      navigate(`/role/${result.id}`);

    } else if (result.type === "skill") {

      navigate(`/courses/${result.id}`);

    } else if (result.type === "course") {

      // Course details page can be connected later.
      navigate(`/courses/${result.id}`);

    }
  };


  return (

    <nav className="navbar">


      {/* Logo */}

      <div className="navbar-logo">

        🚀 Career Navigator AI

      </div>


      {/* Search */}

      <div className="navbar-search">

        <FaSearch className="search-icon" />

        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search careers, skills, courses..."
        />


        {loading && (

          <span className="search-loading">
            ...
          </span>

        )}


        {/* Search Results */}

        {showResults && (

          <div className="search-results">

            {results.length === 0 ? (

              <div className="no-results">
                No results found
              </div>

            ) : (

              results.map((result) => (

                <div
                  key={`${result.type}-${result.id}`}
                  className="search-result"
                  onClick={() =>
                    handleResultClick(result)
                  }
                >

                  <div className="result-type">

                    {result.type === "role" && "💼"}

                    {result.type === "skill" && "🧠"}

                    {result.type === "course" && "📚"}

                  </div>


                  <div className="result-info">

                    <strong>
                      {result.title}
                    </strong>

                    <span>
                      {result.type}
                    </span>

                  </div>

                </div>

              ))

            )}

          </div>

        )}

      </div>


      {/* User */}

      <div className="navbar-right">

        <FaUserCircle size={28} />

        <span>
          Welcome
        </span>

      </div>

    </nav>

  );
}


export default Navbar;
import React, { useContext, useState, useEffect } from "react";
import './Header.css'
import { Link, useNavigate } from "react-router-dom";
import {MdOutlineDarkMode, MdOutlineLightMode} from 'react-icons/md'
import { ThemeContext } from '../../context/Themecontext'
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import SearchResult from "../SearchResult/SearchResult";


function Header() {
    const {darkMode, setDarkMode} = useContext(ThemeContext);
  const {token, setToken, user, setUser } = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  const navigateTo = useNavigate();

  useEffect(
    () => {
      axios(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${query}`)
      .then(res => setSearchResults(res.data.results))
      .catch(err => console.log(err))
    }, [query])

  const toggleMode = () => {
    setDarkMode(prevState => !prevState);
    localStorage.setItem("darkMode", !darkMode);
  }

  const getUserQuery = (e) => {
    setQuery(e.target.value)
  }

  const handleLogout = () => {
    localStorage.clear();
    setUser("");
    setToken("");
    navigateTo("/");
  }

  return (
    <div className={`header-container ${!darkMode ? "header-light" : ""}`}>
      <Link className="logo" to="/">CineTrail</Link>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search movies..."
          onChange={getUserQuery}
        />
        {query.trim() !== "" &&
          <div className="search-results-container">
            {searchResults.map(result => (
              <SearchResult
                key={result.id}
                movie={result}
                setQuery={setQuery}
              />
            ))}
          </div>
        }
      </div>
      <div className="header-buttons-container">
        <div className="theme-buttons-container">
          <div className="theme-buttons">
            <MdOutlineLightMode
              className={`theme-icon ${!darkMode ? "theme-icon-active" : ""}`}
              onClick={darkMode ? toggleMode : undefined}
            />
            <MdOutlineDarkMode
              className={`theme-icon ${darkMode ? "theme-icon-active" : ""}`} 
              onClick={!darkMode ? toggleMode : undefined}
            />
          </div>
        </div>
        <div>
          {token ? (
            <div className="profile-container">
              <img
                src={user?.image_url}
                alt="avatar"
                className="profile-img"
                onClick={() => setShowProfile(prevState => !prevState)}
              />
              <p>Welcome, {user?.username}!</p>
              {showProfile && (
                <div className="profile-options">
                  <Link to={"/myFavorites"}>My Favorites</Link>
                  <p className="logout" onClick={handleLogout}>Logout</p>
                </div>
              )}
            </div>
          ) : (
            <button
              className="create-account-btn"
              onClick={() => navigateTo("/signup")}
            >
              Create an Account
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
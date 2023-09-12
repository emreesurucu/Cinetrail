import React, { useContext } from "react";
import './HomePage.css'
import Slider from '../../Components/Slider/Slider'
import { ThemeContext } from "../../context/ThemeContext";
import TopRated from "../../Components/TopRated/TopRated";
import PopularMovies from "../../Components/PopularMovies/PopularMovies";
import '../Movies.css'

function HomePage() {
  const {darkMode, setDarkMode} = useContext(ThemeContext);

  return (
    <div className={`homepage-container ${!darkMode ? "home-light" : ""}`}>
      <Slider />
      <div className="movies-wrapper">
        <PopularMovies />
        <TopRated />
      </div>
    </div>
  )
}

export default HomePage
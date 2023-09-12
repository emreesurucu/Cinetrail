import {useEffect, useState} from 'react'
import './slider.css'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";
import Genres from '../Genres/Genres';
import StarRatings from "react-star-ratings";

function Slider() {

    const [upcomingMovies, setUpcomingMovies]=useState([])
    const [movieIndex, setMovieIndex] = useState(0);

    useEffect (
        () => {
          axios.get(`${import.meta.env.VITE_BASE_URL}upcoming?api_key=${import.meta.env.VITE_API_KEY}`)
          .then(res => setUpcomingMovies(res.data.results))
          .catch(err => console.log(err));
        }, []
      );


      const handleRightClick = () => {
        if (movieIndex === upcomingMovies.length - 1) {
          setMovieIndex(0)
        } else {
          setMovieIndex(prevState => prevState + 1)
        }
      }
    
      const handleLeftClick = () => {
        if (movieIndex === 0) {
          setMovieIndex(upcomingMovies.length - 1)
        } else {
          setMovieIndex(prevState => prevState - 1)
        }
      }

      const sliderStyle = {
        backgroundImage: `url(${import.meta.env.VITE_API_BASE_IMAGE_URL}${upcomingMovies[movieIndex]?.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "60vh",
        width: "100%",
        position: "relative"
      }


  return (
    <div style={sliderStyle}>
      <div className="slider-overlay"></div>
      <MdKeyboardArrowLeft className="left-arrow" onClick={handleLeftClick} />
      <MdKeyboardArrowRight className="right-arrow" onClick={handleRightClick} />
      <div className="slider-info">
        <h1>{upcomingMovies[movieIndex]?.title}</h1>
        <p className="slider-description">{upcomingMovies[movieIndex]?.overview.slice(0, 130)}...</p>
        
        <Genres genreIds = {upcomingMovies[movieIndex] ? upcomingMovies[movieIndex]?.genre_ids : []} />
        <p>Release Date: {upcomingMovies[movieIndex]?.release_date}</p>
        
        <div className="rating">
          {upcomingMovies[movieIndex] && (
            <StarRatings
              rating={upcomingMovies[movieIndex]?.vote_average / 2}
              starRatedColor="red"
              numberOfStars={5}
              name="rating"
              starDimension="15px"
              starSpacing="1px"
            />
          )}
        </div>
        <Link to={`/movieDetails/${upcomingMovies[movieIndex]?.id}`} className="see-details">See Details</Link>
      </div>
    </div>
  )
}

export default Slider
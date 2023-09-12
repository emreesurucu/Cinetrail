import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";

function TopRated() {
    const [topRatedMovies, setTopRatedMovies] = useState([]);

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:`${import.meta.env.VITE_ACCESS_TOKEN}`
      }
    };


  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
      .then((res) => {
        setTopRatedMovies(res.data.results.slice(0, 10));
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="top-rated-container">
      <h3>Top Rated Movies</h3>
      <div className="top-rated-cards-wrapper">
        {topRatedMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            width="200px"
            height="100px"
            radius="8px"
            imgSrc={movie.backdrop_path}
            id={movie?.id}
            cardStyle="top-rated-card"
          />
        ))}
      </div>
    </div>
  );
}

export default TopRated
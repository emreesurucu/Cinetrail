import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";
import '../MovieCard/MovieCard.css'

function PopularMovies() {


  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [popularMovies, setPopularMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect (
    () => {
        axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${
                import.meta.env.VITE_API_KEY
            }&page=${currentPage}`
        )
        .then(res => setPopularMovies(res.data.results))
        .catch(err => console.log(err))
    }, [currentPage]
)
  return (
    <div className="popular-container">
        <h3 className="popular-title">Popular Movies</h3>
        <div className="popular-cards-wrapper">
            {popularMovies.map(movie => 
                <MovieCard
                    key={movie?.id}
                    movie={movie}
                    height={"300px"}
                    width={"200px"}
                    cardStyle="popular-card"
                    radius={"16px"}
                    imgSrc={movie?.poster_path}
                    id={movie.id}
                />
            )}
        </div>
        <div className="page-numbers">
            <p>Select Page</p>
            {numbers.map(number => (
                <p key={number} className="page" onClick={() => setCurrentPage(number)}>{number}</p>
            ))}
        </div>
    </div>
  );
  
}

export default PopularMovies
import React from 'react'
import { Link } from "react-router-dom";
import noImage from "/noImage.png";

function SearchResult({movie, setQuery}) {
    return (
        <Link
            className="search-results-item"
            to={`/movieDetails/${movie?.id}`}
            onClick={() => setQuery("")}
        >
            <img
                src={
                    movie?.backdrop_path
                    ? `${import.meta.env.VITE_API_BASE_IMAGE_URL}${movie?.backdrop_path}`
                    : noImage
                }
                alt={movie?.title}
            />
            <p>{movie?.title}</p>
        </Link>
      )
}

export default SearchResult
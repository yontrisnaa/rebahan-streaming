import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/detail/${movie.detailPath || ''}`} className="movieCard">
      <div className="posterWrapper">
        <img src={movie.poster} alt={movie.title} className="posterImage" loading="lazy" />
        <div className="ratingBadge">
          <Star size={12} fill="#fbbf24" stroke="none" />
          {movie.rating}
        </div>
        <div className="overlay">
          <h3 className="movieTitle">{movie.title}</h3>
          <div className="movieInfo">
            <span>{movie.year}</span>
            <span>{movie.type}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;

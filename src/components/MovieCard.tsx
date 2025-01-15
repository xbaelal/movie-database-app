import React from "react";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  id: number;
  type: "movie" | "tv";
  title: string;
  posterPath: string;
  releaseDate: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, type, title, posterPath, releaseDate }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`; // Construct the image URL
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/details/${type}/${id}`); // Ensure the correct path is used
  };

  return (
    <div className="movie-card">
      <img src={posterUrl} alt={title} className="movie-card__image" onClick={handleCardClick} />
      <div className="movie-card__info">
        <h3>{title}</h3>
        <p>{releaseDate}</p>
        <div className="button-container">
          <button onClick={handleCardClick}>View Details</button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

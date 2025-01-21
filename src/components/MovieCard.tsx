import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGenres } from "../context/GenresContext";

interface MovieCardProps {
  id: number;
  type: "movie" | "tv";
  title: string;
  posterPath: string;
  releaseDate: string;
  genreIds: number[];
}

const MovieCard: React.FC<MovieCardProps> = ({ id, type, title, posterPath, releaseDate, genreIds }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
  const navigate = useNavigate();
  const { moviesGenre, tvGenre } = useGenres();

  const genres = type === "movie" ? moviesGenre : tvGenre;
  const genresNames = useMemo(() => {
    return genreIds.map((id) => genres.find((genre) => genre.id === id)?.name).filter(Boolean);
  }, [genreIds, genres]);
  const handleCardClick = () => {
    navigate(`/details/${type}/${id}`);
  };

  return (
    <div className="movie-card">
      <img src={posterUrl} alt={title} className="movie-card__image" onClick={handleCardClick} />
      <div className="movie-card__info">
        <h3>{title}</h3>
        <p>{releaseDate}</p>
        <p>{genresNames.join(", ")}</p>
        <div className="button-container">
          <button onClick={handleCardClick}>View Details</button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

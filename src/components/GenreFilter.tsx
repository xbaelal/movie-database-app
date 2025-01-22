import React from "react";
import { useGenres } from "../context/GenresContext";

interface GenreFilterProps {
  onSelect: (genreId: number) => void;
  searchType: string;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ onSelect, searchType }) => {
  const { moviesGenre, tvGenre } = useGenres();

  if (!moviesGenre.length || !tvGenre.length) {
    return <p>Loading genres...</p>;
  }

  return (
    <section>
      {searchType === "movie" && (
        <div className="genre-filter">
          {moviesGenre.map((genre) => (
            <button key={genre.id} onClick={() => onSelect(genre.id)}>
              {genre.name}
            </button>
          ))}
        </div>
      )}
      {searchType === "tv" && (
        <div className="genre-filter">
          {tvGenre.map((genre) => (
            <button key={genre.id} onClick={() => onSelect(genre.id)}>
              {genre.name}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default GenreFilter;

import React from "react";
import { useGenres } from "../context/GenresContext";

interface GenreFilterProps {
  genres: { id: number; name: string }[];
}
const GenreFilter: React.FC<GenreFilterProps> = () => {
  const { moviesGenre, tvGenre } = useGenres();

  if (!moviesGenre.length) {
    return <p>Loading genres...</p>;
  }

  return (
    <section>
      <div>
        <h3>Movie Genres</h3>
        <ul>
          {moviesGenre.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>TV Shows Genres</h3>
        <ul>
          {tvGenre.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default GenreFilter;

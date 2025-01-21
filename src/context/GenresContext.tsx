import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface Genre {
  id: number;
  name: string;
}

interface GenreContextType {
  moviesGenre: Genre[];
  tvGenre: Genre[];
}

export const GenresContext = createContext<GenreContextType | undefined>(undefined);

export const GenresProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [moviesGenre, setMoviesGenre] = useState<Genre[]>([]);
  const [tvGenre, setTvGenre] = useState<Genre[]>([]);

  const fetchGenres = async () => {
    try {
      const [movieResponse, tvResponse] = await Promise.all([
        axios.get("https://api.themoviedb.org/3/genre/movie/list", {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
          },
        }),
        axios.get("https://api.themoviedb.org/3/genre/tv/list", {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
          },
        }),
      ]);
      setMoviesGenre(movieResponse.data.genres || []);
      setTvGenre(tvResponse.data.genres || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("Movies Genres:", moviesGenre);
    console.log("TV Genres:", tvGenre);
  }, [moviesGenre, tvGenre]);

  useEffect(() => {
    fetchGenres();
  }, []);

  return <GenresContext.Provider value={{ moviesGenre, tvGenre }}>{children}</GenresContext.Provider>;
};
export const useGenres = (): GenreContextType => {
  const context = useContext(GenresContext);
  if (!context) {
    throw new Error("useGenres must be used within a GenresProvider");
  }
  return context;
};

import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { fetchMovies, fetchTVShows } from "../api";
import Loader from "../components/Loader"; // Import the loader component
import GenreFilter from "../components/GenreFilter";
import { useGenres } from "../context/GenresContext";

const Home = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchType, setSearchType] = useState<"movie" | "tv">("movie");
  const [page, setPage] = useState(1);
  const [hasMoreResults, setHasMoreResults] = useState(true);
  const [error, setError] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<number | undefined>(undefined);

  const { moviesGenre, tvGenre } = useGenres();

  const handleSearch = async () => {
    if (loading) return; // Prevent fetching if already loading
    setLoading(true);
    setError("");

    try {
      const data =
        searchType === "movie"
          ? await fetchMovies(searchQuery, page, selectedGenre)
          : await fetchTVShows(searchQuery, page, selectedGenre);
      setHasMoreResults(data?.page < data?.total_pages);
      setMovies((prevMovies) => [...prevMovies, ...(data?.results || [])]);
    } catch (err) {
      setError("No Results Found");
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const bottom = target.scrollHeight === target.scrollTop + target.clientHeight;

    if (bottom && hasMoreResults && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (page > 1) {
      handleSearch();
    }
  }, [page]);

  useEffect(() => {
    if (searchQuery) {
      setMovies([]);
      setPage(1);
      handleSearch();
    }
  }, [searchQuery, searchType]);

  return (
    <section onScroll={handleScroll}>
      <SearchBar
        onSearch={() => setPage(1)}
        searchType={searchType}
        setSearchType={setSearchType}
        setSearchQuery={setSearchQuery}
      />
      <GenreFilter
        genres={searchType === "movie" ? moviesGenre : tvGenre}
        // onSelect={(genreId) => {
        //   setSelectedGenre(genreId);
        //   setMovies([]);
        //   setPage(1);
        //   handleSearch();
        // }}
      />

      {loading && page === 1 ? (
        <Loader />
      ) : error ? (
        <h3>{error}</h3>
      ) : searchQuery && movies.length === 0 ? (
        <h3 className="error-h3">No results found for your search.</h3>
      ) : (
        <div className="movie-grid">
          {movies.map((movie: any) => (
            <MovieCard
              key={movie.id}
              title={searchType === "movie" ? movie.title : movie.name}
              posterPath={movie.poster_path}
              releaseDate={searchType === "movie" ? movie.release_date : movie.first_air_date}
              id={movie.id}
              type={searchType}
              genreIds={movie.genre_ids}
            />
          ))}
        </div>
      )}

      {loading && page > 1 && <Loader />}
    </section>
  );
};

export default Home;

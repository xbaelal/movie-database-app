import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

export const fetchMovies = async (query: string, page: number, genreId?: number) => {
  try {
    const params: Record<string, any> = { query, page };
    if (genreId) params.with_genres = genreId;

    const response = await apiClient.get("/search/movie", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return null;
  }
};

export const fetchTVShows = async (query: string, page: number, genreId?: number) => {
  try {
    const params: Record<string, any> = { query, page };
    if (genreId) params.with_genres = genreId;

    const response = await apiClient.get("/search/tv", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching TV shows:", error);
    return null;
  }
};

export const fetchMovieDetails = async (id: string) => {
  try {
    const response = await apiClient.get(`/movie/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

export const fetchTVShowDetails = async (id: string) => {
  try {
    const response = await apiClient.get(`/tv/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching TV show details:", error);
    return null;
  }
};

export const fetchMoviesByGenre = async (genreId: number, page: number) => {
  try {
    const response = await apiClient.get("/discover/movie", {
      params: { with_genres: genreId, page },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return null;
  }
};

export const fetchTVShowsByGenre = async (genreId: number, page: number) => {
  try {
    const response = await apiClient.get("/discover/tv", {
      params: { with_genres: genreId, page },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching TV shows by genre:", error);
    return null;
  }
};

export const fetchGenres = async () => {
  try {
    const [movieGenresResponse, tvGenresResponse] = await Promise.all([
      apiClient.get("/genre/movie/list"),
      apiClient.get("/genre/tv/list"),
    ]);

    return {
      movieGenres: movieGenresResponse.data.genres,
      tvGenres: tvGenresResponse.data.genres,
    };
  } catch (error) {
    console.error("Error fetching genres:", error);
    return null;
  }
};

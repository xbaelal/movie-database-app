import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

export const fetchMovies = async (query: string, page: number) => {
  try {
    const response = await apiClient.get("/search/movie", {
      params: { query, page },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return null;
  }
};

export const fetchTVShows = async (query: string, page: number) => {
  try {
    const response = await apiClient.get("/search/tv", {
      params: { query, page },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching TV shows:", error);
    return null;
  }
};

export const fetchMovieDetails = async (id: string) => {
  try {
    const response = await apiClient.get(`/movie/${id}`); // Fetch movie details
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

export const fetchTVShowDetails = async (id: string) => {
  try {
    const response = await apiClient.get(`/tv/${id}`); // Fetch TV show details
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching TV show details:", error);
    return null;
  }
};

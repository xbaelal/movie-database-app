import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMovieDetails, fetchTVShowDetails } from "../api";
import Loader from "../components/Loader";

const Details = () => {
  const navigate = useNavigate();

  const { type, id } = useParams<{ type: string; id: string }>();
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let data;
        if (type === "movie") {
          data = await fetchMovieDetails(id!);
        } else if (type === "tv") {
          data = await fetchTVShowDetails(id!);
        } else {
          throw new Error("Invalid Type Provided");
        }

        if (data) {
          setDetails(data);
        } else {
          setError(`Failed to fetch details for ${type}`);
        }
      } catch (err) {
        setError(`Error: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    if (id && type) {
      fetchData();
    }
  }, [type, id]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  if (!details) return <p>No Details Found</p>;

  return (
    <section>
      <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button>
      <img src={`https://image.tmdb.org/t/p/w500${details?.poster_path}`} alt={details?.title || details?.name} />
      <h1>{details?.title || details?.name}</h1>
      <p>{details?.overview}</p>
      <p>Release Date: {details?.release_date || details?.first_air_date}</p>
      <p>Ratings: {details?.vote_average}</p>
      <ul>
        Genres:
        {details.genres.map((genre: any) => {
          return <li key={genre.id}>{genre.name}</li>;
        })}
      </ul>
    </section>
  );
};

export default Details;

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
    <section className="details-section">
      <div className="btn-wrapper">
        <button onClick={() => navigate(-1)} className="back-button">
          Back
        </button>
      </div>
      <div className="heading">
        <h1>{details?.title || details?.name}</h1>
      </div>
      <div className="detail">
        <div className="img-wrapper">
          <img src={`https://image.tmdb.org/t/p/w500${details?.poster_path}`} alt={details?.title || details?.name} />
        </div>
        <div className="content">
          <p>Release Date: {details?.release_date || details?.first_air_date}</p>
          <p>Ratings: {details?.vote_average}</p>
          <div className="genre-container">
            <p>Genres:</p>
            <ul>
              {details.genres.map((genre: any) => {
                return <li key={genre.id}>{genre.name}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="desc">
        <p>{details?.overview}</p>
      </div>
    </section>
  );
};

export default Details;

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { APIKey } from "../../config/key";
import { imagePath } from "../Home";
import { Container } from "./styles";

export default function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKey}&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        const { title, poster_path, overview, release_date } = data;
        const movie = {
          id,
          title,
          sinopse: overview,
          image: `${imagePath}${poster_path}`,
          releaseDate: release_date,
        };

        setMovie(movie);
      });
  }, [id]);

  return (
    <Container>
      <div className="movie">
        <img src={movie.image} alt={movie.sinopse}></img>
        <div className="details">
          <h1>{movie.title}</h1>
          <span>Sinopse: {movie.sinopse}</span>
          <span className="release-date">
            Release Date: {movie.releaseDate}
          </span>
          <Link to="/">
            <button>Go Back</button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

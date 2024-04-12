import { useEffect, useState } from "react";
import "./App.css";
import { getMovieList, searchMovie } from "./api";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>MOVIE MANIA MANTAP</h1>
        <input placeholder="cari film kesayangan anda..." className="Movie-search" onChange={({ target }) => search(target.value)} />

        <div className="Movie-container">
          {popularMovies.map((movie, i) => (
            <div className="Movie-wrapper" key={i}>
              <div className="Movie-title">{movie.title}</div>
              <img className="Movie-image" src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} alt={movie.title} />
              <div className="Movie-date">Release: {movie.release_date}</div>
              <div className="Movie-rate">Rating: {movie.vote_average}</div>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
};

export default App;

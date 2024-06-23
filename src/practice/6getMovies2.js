import { useEffect, useState } from "react";
import Movie from "./components/Movie";


function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  /*
  //1.
  useEffect(() => {
    fetch("https://yts.mx/api/v2/list_movies.json?minumum_rating=8.5&sort_by=year")
      .then((response) => response.json())
      .then((json) => {
        setMovies(json.data.movies);
        setLoading(false);
      });
  }, []);
  */
  //2.
  const getMovies = async() => {
    //2-1.
    //const response = await fetch("https://yts.mx/api/v2/list_movies.json?minumum_rating=8.5&sort_by=year");
    //const json = await response.json();
    //2-2.
    const json = await (
      await fetch(
        "https://yts.mx/api/v2/list_movies.json?minumum_rating=8.8&sort_by=year"
      )
    ).json();
    setLoading(false);
    setMovies(json.data.movies);
  };
  useEffect(() => {
    getMovies();
  }, []);
  console.log(movies);
  return (
    <div>
      {loading 
        ? <h1>Loading...</h1> 
        : <div>
            {movies.map((movie) => (
              <Movie 
                key={movie.id}
                coverImg={movie.medium_cover_image} 
                title={movie.title} 
                summary={movie.summary} 
                genres={movie.genres}
              />
            ))}
          </div>
      }
    </div>
  );
}

export default App;

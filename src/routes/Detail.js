import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState([]);
  /*
  const getMovie = useCallback(async() => {
    const json = await(
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log("mv", json);
    setLoading(false);
    setDetails(json.data.movie);
  });
  useEffect(() => {
    getMovie(); 
  }, [id]);
  */
  
  useEffect(() => {
    const getMovie = async() => {
      const json = await(
        await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      ).json();
      console.log("mv", json);
      setLoading(false);
      setDetails(json.data.movie);
    };

    getMovie(); 
  }, [id]);

  return (
    <div>
      {loading 
        ? <h1>Loading...</h1> 
        : <div>
              <h1>{details.title}</h1>

          </div>
      }
    </div>
  );
}
export default Detail;
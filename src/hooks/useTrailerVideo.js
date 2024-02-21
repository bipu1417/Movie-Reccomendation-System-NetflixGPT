import { MOVIE_VIDEO_URL, options } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addTrailerVideos } from '../utils/movieSlice';
import { useEffect } from 'react';

const useTrailerVideo = (movieid) => {
    const dispatch = useDispatch();
    const trailerVideos = useSelector(store => store.movies.trailerVideos);

  const getMovieVideo = async () => {
    const data = await fetch(MOVIE_VIDEO_URL+movieid+"/videos?language=en-US", options);
    const json = await data.json();
    // console.log(json);

    const filterdata = json.results.filter(video => video.type === "Trailer");
    const trailer = filterdata.length ? filterdata[0] : json.results[0];
    // console.log(trailer);
    dispatch(addTrailerVideos(trailer));
  };

  useEffect(() => {
    !trailerVideos && getMovieVideo();
  }, []);
};

export default useTrailerVideo;
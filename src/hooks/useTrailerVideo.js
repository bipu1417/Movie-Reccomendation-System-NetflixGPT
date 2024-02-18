import { MOVIE_VIDEO_URL, options } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addTrailerVideos } from '../utils/movieSlice';
import { useEffect } from 'react';

const useTrailerVideo = (movieid) => {
    const dispatch = useDispatch();

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
    getMovieVideo();
  }, []);
};

export default useTrailerVideo;
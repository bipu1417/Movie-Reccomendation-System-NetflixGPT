import { useEffect } from 'react';
import { url, options } from '../utils/constants';
import { useDispatch } from 'react-redux';
import {addNowPlayingMovies} from '../utils/movieSlice';

const useNowPlayingMovie = () => {
// fetch data from TMDB API and update the redux store
  const dispatch = useDispatch();

  const getNowPlayingMovies = async () => {
    const data = await fetch(url, options);
    const json = await data.json();
    // console.log(json.results);
    dispatch(addNowPlayingMovies(json.results));
  }

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};


export default useNowPlayingMovie;
import { useEffect } from 'react';
import { url, options } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import {addNowPlayingMovies} from '../utils/movieSlice';

const useNowPlayingMovie = () => {
// fetch data from TMDB API and update the redux store
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies);

  const getNowPlayingMovies = async () => {
    const data = await fetch(url, options);
    const json = await data.json();
    // console.log(json.results);
    dispatch(addNowPlayingMovies(json.results));
  }

  useEffect(() => {
    !nowPlayingMovies && getNowPlayingMovies();
  }, []);
};


export default useNowPlayingMovie;
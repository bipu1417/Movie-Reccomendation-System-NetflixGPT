import { useEffect } from 'react';
import { POPULAR_MOVIES_URL, options } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import {addPopularMovies} from '../utils/movieSlice';

const usePopularMovies = () => {
// fetch data from TMDB API and update the redux store
  const dispatch = useDispatch();
  const popularMovies = useSelector(store => store.movies.popularMovies);

  const getPopularMovies = async () => {
    const data = await fetch(POPULAR_MOVIES_URL, options);
    const json = await data.json();
    // console.log(json.results);
    dispatch(addPopularMovies(json.results));
  }

  useEffect(() => {
    !popularMovies && getPopularMovies();
  }, []);
};


export default usePopularMovies;
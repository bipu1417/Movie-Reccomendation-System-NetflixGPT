import { useEffect } from 'react';
import { options, TOP_RATED_MOVIES_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import {addTopRatedMovies} from '../utils/movieSlice';

const useTopRatedMovies = () => {
// fetch data from TMDB API and update the redux store
  const dispatch = useDispatch();
  const topRatedMovies = useSelector(store => store.movies.topRatedMovies);

  const getTopRatedMovies = async () => {
    const data = await fetch(TOP_RATED_MOVIES_URL, options);
    const json = await data.json();
    // console.log(json.results);
    dispatch(addTopRatedMovies(json.results));
  }

  useEffect(() => {
    !topRatedMovies && getTopRatedMovies();
  }, []);
};


export default useTopRatedMovies;
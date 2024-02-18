import { useEffect } from 'react';
import { options, TOP_RATED_MOVIES_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import {addTopRatedMovies} from '../utils/movieSlice';

const useTopRatedMovies = () => {
// fetch data from TMDB API and update the redux store
  const dispatch = useDispatch();

  const getTopRatedMovies = async () => {
    const data = await fetch(TOP_RATED_MOVIES_URL, options);
    const json = await data.json();
    // console.log(json.results);
    dispatch(addTopRatedMovies(json.results));
  }

  useEffect(() => {
    getTopRatedMovies();
  }, []);
};


export default useTopRatedMovies;
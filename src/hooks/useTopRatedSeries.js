import { useEffect } from 'react';
import { options, TOP_RATED_SERIES_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import {addTopRatedSeries} from '../utils/movieSlice';

const useTopRatedSeries = () => {
// fetch data from TMDB API and update the redux store
  const dispatch = useDispatch();
  const topRatedSeries = useSelector(store => store.movies.topRatedSeries);

  const getTopRatedSeries = async () => {
    const data = await fetch(TOP_RATED_SERIES_URL, options);
    const json = await data.json();
    // console.log(json.results);
    dispatch(addTopRatedSeries(json.results));
  }

  useEffect(() => {
    !topRatedSeries && getTopRatedSeries();
  }, []);
};


export default useTopRatedSeries;
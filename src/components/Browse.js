import React from 'react';
import Header from './Header';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import useNowPlayingMovie from '../hooks/useNowPlayingMovies';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useTopRatedSeries from '../hooks/useTopRatedSeries';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';

const Browse = () => {

  const showGptsearchView = useSelector(store => store.gpt.showGptSearch);

  useNowPlayingMovie();
  usePopularMovies();
  useTopRatedMovies();
  useTopRatedSeries();

  return (
    <div>
      <Header />
      {
        showGptsearchView ?  <GptSearch /> : 
        <>
        <MainContainer />
        <SecondaryContainer />
        </>
      }
    </div>
  );
};

export default Browse;

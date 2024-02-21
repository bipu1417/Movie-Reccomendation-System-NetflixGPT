import React, { useRef } from 'react';
import lang from '../utils/languageConstants';
import { useDispatch, useSelector } from 'react-redux';
import openai from '../utils/opanAi';
import { SEARCH_MOVIE_API, options } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {
  const langKey = useSelector(store => store.config.lang);
  const dispatch = useDispatch();
  const searchText = useRef("");

  // Search movie in TMDB
  const searchMovieTmdb = async (movieName) => {
    const data = await fetch(SEARCH_MOVIE_API+movieName+"&include_adult=false&language=en-US&page=1", options);
    const json = await data.json();

    return json.results;
  }

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);
    //Make an API call to openAI and get movie results

    const gptQuery = "Act as Movie Reccomendation System and suggest some movies for the query "+searchText.current.value+" only give me names of 5 movies, comma separated like example result given ahead , Example result: Gadar, Sholey, Don, Dilwale, Golmal";
   
      const gptResults = await openai.chat.completions.create({
        messages: [{ role: 'user', content: gptQuery }],
        model: 'gpt-3.5-turbo',
      });

      if(!gptResults?.choices){
        //handle the error
      }

      const gptMovieList = gptResults?.choices?.[0]?.message?.content.split(",");
     
      // Search for each movies
      const promiseArray = gptMovieList.map(movie => searchMovieTmdb(movie));
      // array of promises will be returned [promise1, promise2,..,..,.]
      const tmdbResults = await Promise.all(promiseArray);
      dispatch(addGptMovieResult({movieNames: gptMovieList, moviesResult: tmdbResults}));
    
  }
  return (
    <div className='pt-[10%] flex justify-center'>
      <form className='bg-black w-1/2 grid grid-cols-12 shadow-lg' onSubmit={(e) => e.preventDefault()}>
          <input ref={searchText} type='text' className='p-4 m-4 col-span-9' placeholder={lang[langKey].gptSearchPlaceholder}/>
          <button className='py-2 px-4 bg-red-700 text-white rounded-lg col-span-3 m-4' onClick={handleGptSearchClick}>{lang[langKey].search}</button>
      </form>
    </div>
  );
};

export default GptSearchBar;
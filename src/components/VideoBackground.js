import React from 'react';
import useTrailerVideo from '../hooks/useTrailerVideo';
import { useSelector } from 'react-redux';

const VideoBackground = ({movieid}) => {
  const trailerVideo = useSelector(store => store.movies.trailerVideos);

  useTrailerVideo(movieid);

  return (
    <div className='w-screen'>
      <iframe 
      className='w-screen aspect-video'
      src={"https://www.youtube.com/embed/"+trailerVideo?.key+"?&autoplay=1&mute=1"} 
      title="YouTube video player" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">

      </iframe>
    </div>
  );
};

export default VideoBackground;
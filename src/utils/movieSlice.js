import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        trailerVideos: null,
        popularMovies: null,
        topRatedMovies: null,
        topRatedSeries: null,
    },
    reducers: {
        addTopRatedSeries: (state, action) => {
            state.topRatedSeries = action.payload;
        },
        addTopRatedMovies: (state, action) => {
            state.topRatedMovies = action.payload;
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addTrailerVideos: (state, action) => {
            state.trailerVideos = action.payload;
        },
    },
});

export const { addTopRatedSeries, addNowPlayingMovies, addTrailerVideos, addPopularMovies, addTopRatedMovies } = movieSlice.actions;

export default movieSlice.reducer;
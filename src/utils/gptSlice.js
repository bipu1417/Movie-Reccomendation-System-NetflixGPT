import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: 'gpt',
    initialState: {
        showGptSearch: false,
        movieNames: null,
        moviesResult: null,
    },
    reducers: {
        toggleGptSearchView: (state) => {
            state.showGptSearch = !state.showGptSearch;
        },
        addGptMovieResult: (state, action) => {
            const { movieNames, moviesResult } =  action.payload;
            state.movieNames = movieNames;
            state.moviesResult = moviesResult;
        },
    }
});

export const { addGptMovieResult, toggleGptSearchView } = gptSlice.actions;
export default gptSlice.reducer;
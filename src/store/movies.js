import { createSlice } from '@reduxjs/toolkit';

export const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    list: null,
  },
  reducers: {
    saveMovies: (state, action) => {
      const { results, page, total_pages } = action.payload;
      return {
        ...state,
        loading: false,
        page,
        total_pages,
        list: results,
      };
    },
    appendMovies: (state, action) => {
      const { results, page, total_pages } = action.payload;
      return {
        ...state,
        loading: false,
        page,
        total_pages,
        list: [...state.list, ...results]
      };
    },
    saveMovieDetails: (state, action) => {
      return {
        ...state,
        movieDetails: action.payload,
      };
    },
    saveSimilarMovies: (state, action) => {
      const { results } = action.payload;
      return {
        ...state,
        movieDetails: { ...state.movieDetails, similar_movies: results },
      };
    },
  },
});

export const { saveMovies, appendMovies, saveMovieDetails, saveSimilarMovies } = movieSlice.actions;
export default movieSlice.reducer;

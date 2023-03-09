import { RootState } from '../store';

export const getMovies = (state: RootState) =>
  state.movies.moviesSearchReducer.data;

export const getMoviesTotalResults = (state: RootState) =>
  state.movies.moviesSearchReducer.totalResults;

export const isLoading = (state: RootState) =>
  state.movies.moviesSearchReducer.loading;

export const getOneMovie = (state: RootState) =>
  state.movies.movieManualReducer.movie;

export const getLoadingManual = (state: RootState) =>
  state.movies.movieManualReducer.loading;

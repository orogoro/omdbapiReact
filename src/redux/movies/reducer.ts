import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import 'react-toastify/dist/ReactToastify.css';

import { fetchMovies, fetchOneMovie } from './operations';
import { moviesAction } from './action';

type MovieState = {
  data: any[];
  totalResults: number | null;
  loading: boolean;
};

type MovieManualState = {
  movie: null | any;
  loading: boolean;
};

const initialState: MovieState = {
  data: [],
  totalResults: null,
  loading: false,
};

const moviesSearchReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchMovies.fulfilled, (state, { payload }) => {
      if (payload?.Error) {
        state.loading = false;
        return;
      }
      state.data = [...state.data, ...payload?.Search];
      state.totalResults = Number(payload?.totalResults);
      state.loading = false;
    })
    .addCase(fetchMovies.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchMovies.rejected, (state) => {
      state.loading = false;
    })
    .addCase(moviesAction, (state, { payload }) => {
      state.data = payload;
      state.totalResults = null;
    });
});

const initialStateManual: MovieManualState = {
  movie: null,
  loading: false,
};

const movieManualReducer = createReducer(initialStateManual, (builder) => {
  builder
    .addCase(fetchOneMovie.fulfilled, (state, { payload }) => {
      state.movie = payload;
      state.loading = false;
    })
    .addCase(fetchOneMovie.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchOneMovie.rejected, (state) => {
      state.loading = false;
    });
});

const moviesReducer = combineReducers({
  moviesSearchReducer,
  movieManualReducer,
});

export { moviesReducer };

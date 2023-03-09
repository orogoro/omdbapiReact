import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { getMoviesSearchRequest, getMovie } from '../../API/APImovies';

import { moviesTypes } from '../../types';

const fetchMovies = createAsyncThunk<
  moviesTypes.Movies,
  { currentSearch: string | null; page: number },
  { rejectValue: any }
>('movies/fetchMovies', async (data, { rejectWithValue }: any) => {
  try {
    const response = await getMoviesSearchRequest(data);

    if (response?.Error) {
      toast.error(response?.Error);
    }

    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const fetchOneMovie = createAsyncThunk<
  moviesTypes.OneMovieType,
  string,
  { rejectValue: any }
>('movies/fetchOneMovie', async (id, { rejectWithValue }: any) => {
  try {
    const response = await getMovie(id);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export { fetchMovies, fetchOneMovie };

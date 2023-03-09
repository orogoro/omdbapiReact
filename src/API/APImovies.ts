import axios from 'axios';

import { moviesTypes } from '../types';

export const BASEURL = 'http://www.omdbapi.com/';
const API_KEY = '?apikey=7e8c7aae';

export const movies = axios.create({
  baseURL: `${BASEURL}`,
});

async function getMoviesSearchRequest(data: {
  currentSearch: string | null;
  page: number;
}): Promise<moviesTypes.Movies | undefined> {
  const { currentSearch, page } = data;
  try {
    let response = await movies.get(
      `/${API_KEY}&s=${currentSearch}&type=movie&page=${page}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    if (axios.isCancel(error)) {
      return Promise.reject();
    } else {
      console.log('Error', error);
      return;
    }
  }
}

async function getMovie(
  id: string
): Promise<moviesTypes.OneMovieType | undefined> {
  try {
    let response = await movies.get(`/${API_KEY}&i=${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    if (axios.isCancel(error)) {
      return Promise.reject();
    } else {
      console.log('Error', error);
      return;
    }
  }
}

export { getMoviesSearchRequest, getMovie };

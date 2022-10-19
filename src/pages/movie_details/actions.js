import { getApiUrl, API_KEY } from '../../utils/api_config';
import { saveMovieDetails, saveSimilarMovies } from '../../store/movies';

export function fetchMovieDetails(dispatch, { movieId }) {
  let url = getApiUrl('movieDetails', { movieId: movieId }) + `?api_key=${API_KEY}`;
  fetch(url)
    .then((data) => data.json())
    .then((data) => {
      dispatch(saveMovieDetails(data));
      return data.results;
    });
}

export function fetchSimilarMovies(dispatch, { movieId }) {
  let url = getApiUrl('similarMovies', { movieId: movieId }) + `?api_key=${API_KEY}`;
  fetch(url)
    .then((data) => data.json())
    .then((data) => {
      dispatch(saveSimilarMovies(data));
      return data.results;
    });
}

export async function rateMovie(dispatch, { movieId, rating }) {
  let url = getApiUrl('rateMovie', { movieId: movieId }) + `?api_key=${API_KEY}`;

  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({value: rating}) // body data type must match "Content-Type" header
  });
  return response;
}

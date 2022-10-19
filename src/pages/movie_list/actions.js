import { getApiUrl, API_KEY } from '../../utils/api_config';
import { saveMovies, appendMovies } from '../../store/movies';

export function fetchMoviesList(dispatch, data = {}) {
  const {isSearch, search, page } = data;
  let url = getApiUrl('moviesList') + `?api_key=${API_KEY}&page=${page}`;
  if (isSearch) {
    url = getApiUrl('searchMovies') + `?api_key=${API_KEY}&query=${search}&page=${page}`;
  }
  console.log(data);
  fetch(url)
    .then((data) => data.json())
    .then((data) => {
      if (isSearch) {
        dispatch(saveMovies(data))
      } else {
        page === 1 ? dispatch(saveMovies(data)) : dispatch(appendMovies(data));
      }
      return data.results;
    });
}
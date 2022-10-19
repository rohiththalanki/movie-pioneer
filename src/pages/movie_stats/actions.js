import { getApiUrl, API_KEY } from '../../utils/api_config';
import { saveMovies } from '../../store/movies';

export function fetchTopRatedMovies(dispatch) {
  let url = getApiUrl('topRatedMovies') + `?api_key=${API_KEY}`;

  fetch(url)
    .then((data) => data.json())
    .then((data) => {
      dispatch(saveMovies(data));
      return data.results;
    });
}

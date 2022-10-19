export const HOST = 'https://api.themoviedb.org';
export const API_KEY = 'b3a2596ed60c599952e780c902207585';

const API = {
  moviesList: `${HOST}/3/discover/movie`,
  movieDetails: `${HOST}/3/movie/::movieId`,
  similarMovies: `${HOST}/3/movie/::movieId/similar`,
  topRatedMovies: `${HOST}/3/movie/top_rated`,
  searchMovies: `${HOST}/3/search/movie`,
  rateMovie: `${HOST}/3/movie/::movieId/rating`
};

function getApiUrl(key, params = {}) {
  let url = API[key];
  const paramRegex = /::([^/]+)/g;

  url = url.replace(paramRegex, (_, paramMatch) => {
    paramMatch = paramMatch.split('=');
    const paramKey = paramMatch[0];
    const defaultValue = paramMatch[1];
    const urlPart = params[paramKey] || params[paramKey] === 0 ? params[paramKey] : defaultValue;
    if (!(urlPart || urlPart === 0))
      throw new Error(`Required param ${paramKey} not passed for ${url}`);
    return urlPart;
  });
  console.log()
  return url;
}

export { API, getApiUrl };

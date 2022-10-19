import Home from '../pages/home/home';
import List from '../pages/movie_list/movie_list';
import MovieDetails from '../pages/movie_details/movie_details';
import MovieStats from '../pages/movie_stats/movie_stats';

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/movies',
    name: 'movies_listing',
    component: List,
  },
  {
    path: '/movies/stats',
    name: 'movie_stats',
    component: MovieStats,
  },
  {
    path: '/movies/:id',
    name: 'movies_details',
    component: MovieDetails,
  },
  {
    path: '*',
    name: 'movies_details',
    component: List,
  },
];

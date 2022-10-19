import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store/store';

import App from './layout/index';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
);

// b3a2596ed60c599952e780c902207585
// https://api.themoviedb.org/3/movie/550?api_key=b3a2596ed60c599952e780c902207585

// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2EyNTk2ZWQ2MGM1OTk5NTJlNzgwYzkwMjIwNzU4NSIsInN1YiI6IjYzNDg1NWRmOWNjNjdiMDA3ZGQ0MDVkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3clO-PwyqSj7Lm7rRaaoRaatVObILEkq3uO-oulOEi0
// https://image.tmdb.org/t/p/w440_and_h660_face/5hoS3nEkGGXUfmnu39yw1k52JX5.jpg
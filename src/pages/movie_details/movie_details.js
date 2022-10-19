import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import { Tag, Button, Spin, Row, Col, Rate } from 'antd';

import MovieCard from '../movie_list/movie_card';

import { fetchMovieDetails, fetchSimilarMovies, rateMovie } from './actions';
import { renderRuntime, renderGenres } from './helper';

import './movie_details.scss';

function MovieList(props) {
  const { fetchMovieDetails, fetchSimilarMovies, rateMovie, movies, propId } = props;

  const [rating, setRating] = useState(0);

  useEffect(() => {
    fetchMovieDetails({ movieId: propId });
    fetchSimilarMovies({ movieId: propId });
  }, []);

  const submitReview = () => {
    rateMovie({ movieId: propId, rating: rating * 2 });
  };

  const { movieDetails } = movies;

  if (!movieDetails) {
    return (
      <div className="spinner">
        <Spin />
      </div>
    );
  }

  const {
    adult,
    poster_path,
    release_date,
    spoken_languages = [],
    homepage,
    genres = [],
    overview,
    tagline,
    runtime,
    title,
    vote_average,
    vote_count,
    similar_movies = [],
  } = movieDetails;

  return (
    <div className="mainContainer">
      <div className="innerContainer">
        <div className="section">
          <h2>Movie Details:</h2>
          <div className="movieDetails">
            <img
              className="moviePoster"
              src={`https://image.tmdb.org/t/p/w440_and_h660_face${poster_path}`}
              alt="movie_poster"
            />
            <div className="movieContent">
              <div className="title">{title}</div>
              <div className="tagline">
                <i class="ri-price-tag-3-fill"></i>
                {tagline}
              </div>
              <div className="overview">{overview}</div>
              <div className="ratingSection">
                <i class="ri-heart-2-fill ratingIcon" />
                <span className="voteAverage">{vote_average}</span>
                <span className="voteCount">({vote_count} Ratings)</span>
              </div>
              <div className="movieMeta">
                {renderRuntime(runtime)}
                <span className="dot"> • </span>
                <span className="">{renderGenres(genres)}</span>
                <span className="dot"> • </span>
                {adult ? 'A' : 'UA'}
                <span className="dot"> • </span>
                {dayjs(release_date).format('DD, MMM YYYY')}
              </div>
              <div className="languages">
                {spoken_languages.map((lang) => (
                  <Tag key={lang.english_name} color="warning">
                    {lang.english_name}
                  </Tag>
                ))}
              </div>
              <div>
                <a href={homepage} target="_blank" rel="noreferrer">
                  <Button className="actionButton" size="large">
                    Watch Movie
                  </Button>
                </a>
              </div>
              <div className="rateMovie">
                <p>
                  <b>Already watched?</b> Please rate the movie and help others decide what to watch
                  next!
                </p>
                <Rate onChange={setRating} className="starRating" allowHalf value={rating} />
                <Button onClick={submitReview}>Submit</Button>
              </div>
            </div>
          </div>
        </div>
        {similar_movies.length > 0 && (
          <div className="section">
            <h2>Similar Movies:</h2>
            <div>
              <Row gutter={[30, 30]}>
                {similar_movies.map((mov) => {
                  return (
                    <Col span={6} key={mov.id}>
                      <MovieCard showOverview={false} movie={mov} />
                    </Col>
                  );
                })}
              </Row>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default connect(
  (state, { location }) => {
    return {
      movies: state.movies,
      propId: location.pathname.replace('/movies/', ''),
    };
  },
  (dispatch) => {
    return {
      fetchMovieDetails: (payload) => fetchMovieDetails(dispatch, payload),
      fetchSimilarMovies: (payload) => fetchSimilarMovies(dispatch, payload),
      rateMovie: (payload) => rateMovie(dispatch, payload),
    };
  },
)(MovieList);

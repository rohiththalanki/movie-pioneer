import React from 'react';

import './movie_card.scss';

function MovieCard(props) {
  const { movie, showOverview=true } = props;
  const { poster_path, title, overview, vote_average, vote_count, id } = movie;
  return (
    <a href={`/movies/${id}`}>
      <div className="movieCard"  title={title}>
        <img
          className="moviePoster"
          src={`https://image.tmdb.org/t/p/w440_and_h660_face${poster_path}`}
          alt="movie_poster"
        />
        <div className="movieContent">
          <div className="title">{title}</div>
          {showOverview && <div className="overview">{overview}</div>}
          <div className="ratingsContainer">
            <div className="rating">
              <i class="ri-heart-2-fill ratingIcon" />
              {vote_average} (<span className="reviews">{vote_count} reviews</span>)
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

export default MovieCard;

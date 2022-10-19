import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

// import BarChart from './bar_chart';
import { generateChart } from './bar_chart';

// import MovieCard from './movie_card';

import { fetchTopRatedMovies } from './actions';

import './movie_stats.scss';

function MovieStats(props) {
  const { movies, fetchTopRatedMovies } = props;
  useEffect(() => {
    fetchTopRatedMovies();
  }, []);

  useEffect(() => {
    if (movies?.length > 0) {
      const yValues = movies.map((d) => d.vote_average);
      const yValues_b = movies.map((d) => d.vote_count);

      generateChart({
        id: 'rating-chart',
        width: '500',
        height: '500',
        data: movies,
        xLabel: 'Movie Title',
        yLabel: 'Rating',
        yValues,
      });
      generateChart({
        id: 'vote-rating-chart',
        width: '500',
        height: '500',
        data: movies,
        xLabel: 'Movie Title',
        yLabel: 'Vote Count',
        yValues: yValues_b,
      });
    }
  }, [movies]);

  if (!movies) {
    return <div>Loading</div>;
  }

  return (
    <div className="movieStatsContainer">
      <div className="moviesStats">
      <div className="section">
        <h2 className="sectionTitle">Top Rated Movie Statistics:</h2>
        <Row gutter={[20, 10]}>
          <Col span={11} className="chartContainer">
            <div id="rating-chart" className="rating-charts"></div>
          </Col>
          <Col span={2}></Col>
          <Col span={11} className="chartContainer">
            <div id="vote-rating-chart" className="rating-charts"></div>
          </Col>
        </Row>
      </div>
      </div>
    </div>
  );
}

export default connect(
  (state) => {
    const list = state.movies?.list?.length > 0 ? state.movies.list : [];
    return {
      movies: list.slice(0, 10),
    };
  },
  (dispatch) => {
    return {
      fetchTopRatedMovies: (payload) => fetchTopRatedMovies(dispatch, payload),
    };
  },
)(MovieStats);

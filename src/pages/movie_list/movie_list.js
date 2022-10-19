import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import MovieCard from './movie_card';

import { fetchMoviesList } from './actions';

import './movies_list.scss';

function MovieList(props) {
  const { fetchMoviesList, movies } = props;
  const [queryParams, setQueryParams] = useState({ search: '', page: 1, isSearch: false });

  useEffect(() => {
    fetchMoviesList(queryParams);
  }, []);

  const { list, page, total_pages } = movies;

  if (!list) {
    return <div>Loading</div>;
  }

  const loadMore = () => {
    if (page < total_pages) {
      setQueryParams({ ...queryParams, page: page + 1 });
      fetchMoviesList({ ...queryParams, page: page + 1 });
    }
  };

  const onSearchKeyEntry = (e) => {
    const search = e.target.value;
    let newQuery = queryParams;
    const isEarlierSearch = queryParams.isSearch;
    if (search?.length > 2) {
      if (!isEarlierSearch) {
        newQuery = {
          ...newQuery,
          search,
          isSearch: true,
          page: isEarlierSearch ? queryParams.page : 1,
        };
      }
    } else if (search.length === 0) {
      newQuery = {
        ...newQuery,
        search,
        isSearch: false,
        page: isEarlierSearch ? 1 : queryParams.page,
      };
    }
    setQueryParams(newQuery);
    fetchMoviesList(newQuery);
  };

  return (
    <div className="mainContainer">
      <div className="moviesList">
        <div className="section">
          <div className="filters">
            <h2>Discover:</h2>
            <div>
              <Input
                className="searchbox"
                size="large"
                allowClear
                placeholder="Search for movies"
                prefix={<SearchOutlined />}
                onChange={onSearchKeyEntry}
              />
            </div>
          </div>

          <Row gutter={[30, 30]}>
            {list.map((mov) => {
              return (
                <Col span={6} key={mov.id}>
                  <MovieCard movie={mov} />
                </Col>
              );
            })}
          </Row>
        </div>
        <Button className="viewMore" size="large" onClick={loadMore}>
          View More
        </Button>
      </div>
    </div>
  );
}

export default connect(
  (state) => {
    return {
      movies: state.movies,
    };
  },
  (dispatch) => {
    return {
      fetchMoviesList: (payload) => fetchMoviesList(dispatch, payload),
    };
  },
)(MovieList);

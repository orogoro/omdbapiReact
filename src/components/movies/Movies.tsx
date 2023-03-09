import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { operations, selectors } from '../../redux/movies';

import { Loader, ScrollToTop, MoviesItem, StartFound, NotFound } from '../';
import styles from './Movies.module.scss';

const Movies: React.FC = () => {
  const [searchParams] = useSearchParams();
  const currentSearch = searchParams.get('query');
  const [endFix, setEndFix] = useState<boolean>(true);
  const totalResults = useAppSelector(selectors.getMoviesTotalResults);
  const movies = useAppSelector(selectors.getMovies);
  const isLoading = useAppSelector(selectors.isLoading);
  const location = useLocation();
  const [page, setPage] = useState<number>(
    location?.state?.details.movies === movies.length
      ? location?.state?.details.page + 1
      : 1
  );
  const dispatch = useAppDispatch();
  const prevQuery = useRef<string | null | undefined>(null);
  const pageReff = useRef<number | null | undefined>(null);

  useEffect(() => {
    if (pageReff.current === page && prevQuery.current === currentSearch) {
      return;
    }

    if (prevQuery.current !== currentSearch && pageReff.current !== null) {
      setPage(1);
      setEndFix(true);
    }

    if (movies.length === totalResults) {
      setEndFix(false);
      pageReff.current = page;
      return;
    }

    if (prevQuery.current !== currentSearch && page === 1) {
      pageReff.current = null;
    }

    if (currentSearch && pageReff.current !== page) {
      dispatch(operations.fetchMovies({ currentSearch, page }));
    }

    pageReff.current = page;
    prevQuery.current = currentSearch;
  }, [dispatch, currentSearch, page, movies, totalResults]);

  const showNextMovies = () => {
    if (movies.length !== 0) {
      setPage(page + 1);
    }
  };

  return (
    <div className={styles.container}>
      {movies.length !== 0 && currentSearch && (
        <InfiniteScroll
          dataLength={movies.length}
          next={showNextMovies}
          hasMore={endFix}
          scrollThreshold={1}
          loader={<Loader size={70} />}
        >
          <ul className={styles.list}>
            {movies.map((item) => (
              <MoviesItem
                key={item.imdbID}
                data={item}
                movies={movies.length}
                page={page}
              />
            ))}
          </ul>
        </InfiniteScroll>
      )}

      {!currentSearch && <StartFound />}
      {isLoading && movies.length === 0 && <Loader size={70} />}
      {movies.length === 0 && currentSearch && !isLoading && <NotFound />}

      <ScrollToTop />
    </div>
  );
};

export default Movies;

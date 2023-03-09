import { useEffect, useRef } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { operations, selectors } from '../../redux/movies';

import { ContentMovies, Loader } from '../';

import styles from './MovieDetails.module.scss';

const MovieDetails: React.FC = () => {
  const { itemId } = useParams();
  const manualMovie = useAppSelector(selectors.getOneMovie);
  const loadingManual = useAppSelector(selectors.getLoadingManual);
  const dispatch = useAppDispatch();
  const getFetch = useRef<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (!itemId) {
      return;
    }
    if (getFetch.current === itemId) {
      return;
    }

    dispatch(operations.fetchOneMovie(itemId));

    getFetch.current = itemId;
  }, [dispatch, itemId]);

  return (
    <>
      {!loadingManual && (
        <div className={styles.container}>
          <Link
            className={styles.link}
            to={location?.state?.form?.location ?? '/'}
            state={{
              details: {
                movies: location?.state?.form?.movies,
                page: location?.state?.form?.page,
              },
            }}
          >
            🔙 Go back
          </Link>
          <ContentMovies manualMovie={manualMovie} />
        </div>
      )}
      {loadingManual && <Loader size={70} />}
    </>
  );
};

export default MovieDetails;

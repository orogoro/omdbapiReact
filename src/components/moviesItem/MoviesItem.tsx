import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { moviesTypes } from '../../types';
import noPicture from '../../images/noMovieFoto.png';

import styles from './MoviesItem.module.scss';

interface MoviesItemsProps {
  data: moviesTypes.MoviesItem;
  movies: number;
  page: number;
}

const MoviesItem: React.FC<MoviesItemsProps> = ({ data, movies, page }) => {
  const [error, setError] = useState<boolean>(false);
  const location = useLocation();
  const { Poster, Title, Year, imdbID } = data;

  return (
    <Link
      className={styles.item}
      to={`/${imdbID}`}
      state={{ form: { location, movies, page } }}
    >
      <div className={styles.containerImage}>
        <img
          className={`${styles.image} ${error ? styles.errorPicture : ''}`}
          src={Poster}
          alt={Title}
          onError={(e: React.ChangeEvent<HTMLImageElement>): void => {
            e.target.src = noPicture;
            setError(true);
          }}
        />
      </div>
      <div className={styles.containerText}>
        <h2 className={styles.title}>
          {Title.length > 50 ? Title.slice(0, 45) + '...' : Title}
        </h2>
        <p className={styles.year}>{Year}</p>
      </div>
    </Link>
  );
};

export default MoviesItem;

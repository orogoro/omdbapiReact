import { moviesTypes } from '../../types';
import { StarsRage } from '../';

import ContentMoviesText from './contentMoviesText/ContentMoviesText';

import noPicture from '../../images/noMovieFoto.png';

import styles from './ContentMovies.module.scss';
interface ContentMoviesProps {
  manualMovie: moviesTypes.OneMovieType;
}

const ContentMovies: React.FC<ContentMoviesProps> = ({ manualMovie }) => {
  const parse = parseInt(manualMovie?.Runtime);
  const hours = Math.trunc(parse / 60);
  const minutes = parse % 60;

  return (
    <div className={styles.containerContent}>
      <div className={styles.containerImage}>
        <img
          className={`${styles.image} `}
          src={manualMovie?.Poster}
          alt='Poster'
          onError={(e: React.ChangeEvent<HTMLImageElement>): void => {
            e.target.src = noPicture;
          }}
        />
      </div>
      <div className={styles.containerInformation}>
        <h1>{manualMovie?.Title}</h1>

        <div className={styles.containerText}>
          <p className={styles.titleText}>Vote / Votes</p>
          <div className={styles.containerStars}>
            <StarsRage rage={manualMovie?.imdbRating} />
            <p className={styles.rate}>
              {manualMovie?.imdbRating !== '0.0'
                ? manualMovie?.imdbRating
                : 'No rate'}{' '}
              <span className={styles.spanCount}>
                /{' '}
                {Number(manualMovie?.imdbVotes) !== 0
                  ? manualMovie?.imdbVotes
                  : 'No count'}
              </span>
            </p>
          </div>
        </div>

        <ContentMoviesText title='Year' content={manualMovie?.Year} />
        <ContentMoviesText title='Awards' content={manualMovie?.Awards} />
        <ContentMoviesText title='Genre' content={manualMovie?.Genre} />
        <ContentMoviesText title='Сountry' content={manualMovie?.Country} />
        <ContentMoviesText
          title='Time'
          content={`${hours} hours ${minutes} minutes`}
        />
        <ContentMoviesText title='Release' content={manualMovie?.Released} />
        <ContentMoviesText title='Actors' content={manualMovie?.Actors} />

        <p className={styles.overview}>{manualMovie?.Plot}</p>
      </div>
    </div>
  );
};

export default ContentMovies;

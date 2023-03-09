// import { moviesTypes } from '../../../types';

// import { IMAGEURL } from '../../../API/APImovies';
import noPicture from '../../../images/noMovieFoto.png';

import styles from './ContentMoviesImage.module.scss';

interface ContentMoviesImageProps {
  manualMovie: any;
}

const ContentMoviesImage: React.FC<ContentMoviesImageProps> = ({
  manualMovie,
}) => {
  return (
    <div className={styles.containerImage}>
      <img
        className={`${styles.image} `}
        // src={`${IMAGEURL}${manualMovie?.poster_path}`}
        alt={manualMovie?.title}
        onError={(e: React.ChangeEvent<HTMLImageElement>): void => {
          e.target.src = noPicture;
        }}
      />
    </div>
  );
};

export default ContentMoviesImage;

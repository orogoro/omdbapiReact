import startFound from '../../images/startFound.png';

import styles from './StartFound.module.scss';

const StartFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={startFound} alt='notFound' />
      <h1 className={styles.title}>Find your favorite movie</h1>
    </div>
  );
};

export default StartFound;

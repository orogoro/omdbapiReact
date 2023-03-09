import starFull from '../../images/starFull.png';
import starHalf from '../../images/starHalf.png';
import starZero from '../../images/starZero.png';

import styles from './StarsRage.module.scss';

interface StarsRageProps {
  rage: string;
}

const StarsRage: React.FC<StarsRageProps> = ({ rage }) => {
  const rageNumber = Number(rage);
  return (
    <>
      {rageNumber > 7 && (
        <img className={styles.star} src={starFull} alt='star' />
      )}
      {rageNumber <= 7 && rageNumber > 2 && rageNumber !== 0 && (
        <img className={styles.star} src={starHalf} alt='star' />
      )}
      {rageNumber <= 2 && (
        <img
          className={`${styles.star} ${styles.backgraund}`}
          src={starZero}
          alt='star'
        />
      )}
    </>
  );
};

export default StarsRage;

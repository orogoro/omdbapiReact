import { Link } from 'react-router-dom';

import { Filter } from '../';

import logo from '../../images/iconLogo.png';

import styles from './Navigation.module.scss';

const Navigation: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.containerLogo}>
          <img className={styles.image} src={logo} alt='logo' />
          <Link to='/' className={styles.textLogo}>
            Movie<span className={styles.spanLogo}>ON</span>
          </Link>
        </div>

        <div className={styles.container}>
          <Filter />
        </div>
      </nav>
    </header>
  );
};

export default Navigation;

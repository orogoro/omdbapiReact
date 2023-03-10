import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAppDispatch } from '../../redux/hook';
import { action } from '../../redux/movies';

import magnifyingGlass from '../../images/magnifyingGlass.png';

import styles from './Filter.module.scss';

const Filter: React.FC = () => {
  const [searchParams] = useSearchParams();
  const currentSearch = searchParams.get('query');
  const [value, setValue] = useState<string>(currentSearch ?? '');
  const [disabled, setDisabled] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value.toLowerCase().trim());
  };

  const handleSubmitForm = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setDisabled(true);

    setTimeout(() => {
      setDisabled(false);
    }, 1000);

    if (!value) {
      toast.error("You didn't enter anything");
      return;
    }

    if (value === currentSearch) {
      return;
    }

    navigate(`/?query=${value}`);
    dispatch(action.moviesAction([]));
  };

  return (
    <form onSubmit={handleSubmitForm} className={styles.form}>
      <input
        className={styles.input}
        type='text'
        name='search'
        autoComplete='off'
        value={value}
        onChange={handleChangeInput}
      />
      <button className={styles.button} disabled={disabled}>
        <img
          className={styles.image}
          src={magnifyingGlass}
          alt='Magnifying glass'
        />
      </button>
    </form>
  );
};

export default Filter;

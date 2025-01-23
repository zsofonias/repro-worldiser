import styles from './city-item.module.css';

import { ICity } from '../interface/city.interface';
import { formatDate } from '../utils/helper-methods.utils';
import { Link } from 'react-router';

interface ICityItemProps {
  city: ICity;
}

function CityItem({
  city: { cityName, emoji, date, id, position },
}: ICityItemProps) {
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={styles.cityItem}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;

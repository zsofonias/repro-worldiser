import styles from './city-item.module.css';

import { ICity } from '../interface/city.interface';
import { formatDate } from '../utils/helper-methods.utils';

interface ICityItemProps {
  city: ICity;
}

function CityItem({ city: { cityName, emoji, date } }: ICityItemProps) {
  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>({formatDate(date)})</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}

export default CityItem;

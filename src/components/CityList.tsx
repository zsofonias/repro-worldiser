import styles from './city-list.module.css';
import Spinner from './UI/Spinner';

import { ICity } from '../interface/city.interface';
import CityItem from './CityItem';
import Message from './Message';

interface ICityListProps {
  cities: ICity[];
  isLoading: boolean;
}

function CityList({ cities, isLoading }: ICityListProps) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message="Add your first city by clicking on the map" />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;

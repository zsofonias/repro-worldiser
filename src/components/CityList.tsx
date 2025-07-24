import styles from './city-list.module.css';
import Spinner from './UI/Spinner';

import CityItem from './CityItem';
import Message from './Message';
import { useCities } from '../context/CitiesContext';

function CityList() {
  const { isLoading, cities } = useCities();

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

import { useEffect } from 'react';
import { Link, useLocation, useParams, useSearchParams } from 'react-router';

import styles from './city.module.css';

import Spinner from './UI/Spinner';

import { formatDate } from '../utils/helper-methods.utils';
import Button from './UI/Button';
import { useCities } from '../context/CitiesContext';
import BackButton from './UI/BackButton';

interface ICityRouteParams extends Record<string, string | undefined> {
  cityId: string;
}

function City() {
  const { cityId } = useParams<ICityRouteParams>();
  const { getCity, currentCity, isCurrentCityLoading: isLoading } = useCities();

  if (!cityId) {
    return (
      <div className={styles.city}>
        <h2>No city ID provided</h2>
        <Link to="/app/cities">
          <Button type="back">Back</Button>
        </Link>
      </div>
    );
  }

  useEffect(() => {
    getCity(cityId);
  }, [cityId]);

  // const [searchParams] = useSearchParams();
  // console.log(searchParams.get('lat'), searchParams.get('lng'));

  // const location = useLocation();
  // console.log('location: ', location);

  if (!currentCity)
    return (
      <div className={styles.city}>
        <h2>City not found</h2>
        <BackButton />
      </div>
    );

  return (
    <div className={styles.city}>
      {isLoading && <Spinner />}
      {!isLoading && currentCity && (
        <>
          <div className={styles.row}>
            <h6>City name</h6>
            <h3>
              <span>{currentCity.emoji}</span> {currentCity.cityName}
            </h3>
          </div>

          <div className={styles.row}>
            <h6>You went to {currentCity.cityName} on</h6>
            <p>{formatDate(currentCity.date)}</p>
          </div>

          {currentCity.notes && (
            <div className={styles.row}>
              <h6>Your notes</h6>
              <p>{currentCity.notes}</p>
            </div>
          )}

          <div className={styles.row}>
            <h6>Learn more</h6>
            <a
              href={`https://en.wikipedia.org/wiki/${currentCity.cityName}`}
              target="_blank"
              rel="noreferrer"
            >
              Check out {currentCity.cityName} on Wikipedia &rarr;
            </a>
          </div>
        </>
      )}

      <div>
        {/* <Link to="/app/cities">
          <Button type="back">Back</Button>
        </Link> */}
        <BackButton />
      </div>
    </div>
  );
}

export default City;

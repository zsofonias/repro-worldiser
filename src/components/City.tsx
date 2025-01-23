import { useEffect, useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router';

import styles from './city.module.css';

import Spinner from './UI/Spinner';
import { ICity } from '../interface/city.interface';

import { formatDate } from '../utils/helper-methods.utils';

const CITIES_API_ENDPOINT = 'http://localhost:8000/cities';

interface ICityRouteParams extends Record<string, string | undefined> {
  id: string;
}

function City() {
  const [city, setCity] = useState<ICity>();
  const [isLoading, setIsLoading] = useState(false);

  const { id: cityId } = useParams<ICityRouteParams>();

  const [searchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  console.log(searchParams.get('lat'), searchParams.get('lng'));

  const location = useLocation();
  console.log('location: ', location);

  // TEMP DATA
  // const currentCity = {
  //   cityName: 'Lisbon',
  //   emoji: '🇵🇹',
  //   date: '2027-10-31T15:59:59.138Z',
  //   notes: 'My favorite city so far!',
  // };

  useEffect(() => {
    const controller = new AbortController();

    const fetchCity = () => {
      setIsLoading(true);
      fetch(`${CITIES_API_ENDPOINT}/${cityId}`)
        .then((response) => response.json())
        .then((data: ICity) => setCity(data))
        .catch((err) => {
          if (err.name !== 'AbortError') {
            console.log(err);
          }

          // console.log(err)
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchCity();

    return () => {
      controller.abort();
    };
  }, [cityId]);

  const { cityName = '', emoji = '', date = '', notes = '' } = city || {};

  return (
    <div className={styles.city}>
      {isLoading && <Spinner />}
      {!isLoading && city && (
        <>
          <div className={styles.row}>
            <h6>City name</h6>
            <h3>
              <span>{emoji}</span> {cityName}
            </h3>
          </div>

          <div className={styles.row}>
            <h6>You went to {cityName} on</h6>
            <p>{formatDate(date)}</p>
          </div>

          {notes && (
            <div className={styles.row}>
              <h6>Your notes</h6>
              <p>{notes}</p>
            </div>
          )}

          <div className={styles.row}>
            <h6>Learn more</h6>
            <a
              href={`https://en.wikipedia.org/wiki/${cityName}`}
              target="_blank"
              rel="noreferrer"
            >
              Check out {cityName} on Wikipedia &rarr;
            </a>
          </div>
        </>
      )}

      <div>{/* <ButtonBack /> */}</div>
    </div>
  );
}

export default City;

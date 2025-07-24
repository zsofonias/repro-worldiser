import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { useCities } from '../context/CitiesContext';
import { useUrlGeoPosition } from '../hooks/useUrlGeoPosition';
import Button from './UI/Button';
import BackButton from './UI/BackButton';
import Message from './Message';
import Spinner from './UI/Spinner';
import styles from './form.module.css';

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

export function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [emoji, setEmoji] = useState('');

  const { createCity, isLoading } = useCities();

  const { lat, lng } = useUrlGeoPosition();
  const [isLoadingGeocoding, setIsLoadingGeoloading] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState('');

  useEffect(() => {
    if (!lat || !lng) return;
    async function fetchLocationData() {
      try {
        setGeoCodingError('');
        setIsLoadingGeoloading(true);
        const response = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();

        if (!data.countryCode)
          throw new Error('Incorrect City/Country location');

        setCityName(data.city ?? data.locality ?? '');
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        console.log(err);
        if (err instanceof Error) setGeoCodingError(err.message);
      } finally {
        setIsLoadingGeoloading(false);
      }
    }

    fetchLocationData();
  }, [lat, lng]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };

    await createCity(newCity);
    navigate('/app/cities');
  }

  function handleSelectDate(date: Date | null) {
    console.log(date);
    if (date) setDate(date);
  }

  if (!lat || !lng) {
    return <Message message="Click on the map to get a location" />;
  }

  if (isLoadingGeocoding) {
    return <Spinner />;
  }

  if (geoCodingError) {
    return <Message message={geoCodingError} />;
  }

  return (
    <form
      className={`${styles.form} ${isLoading && styles.loading}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(new Date(e.target.value))}
          value={date.toISOString()}
        /> */}
        <DatePicker
          id="date"
          onChange={(date) => handleSelectDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>

        {/* <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button> */}
        <BackButton />
      </div>
    </form>
  );
}

export default Form;

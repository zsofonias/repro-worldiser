// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';

import styles from './form.module.css';
import Button from './UI/Button';
import BackButton from './UI/BackButton';

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

  function handleOnClickBack(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(new Date(e.target.value))}
          value={date.toISOString()}
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

        {/* <Button type="back" onClick={handleOnClickBack}> */}
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

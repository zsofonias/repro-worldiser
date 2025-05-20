import CountryItem from './CountryItem';
import Message from './Message';
import Spinner from './UI/Spinner';
import { ICountry } from '../interface/city.interface';

import styles from './country-list.module.css';
import { useCitiesContext } from '../context/CitiesContext';

function CountryList() {
  const { isCitiesLoading, cities } = useCitiesContext();

  // const countries: ICountry[] = [];
  // cities.forEach((city) => {
  //   if (!countries.map((country) => country.country).includes(city.country)) {
  //     countries.push({
  //       country: city.country,
  //       emoji: city.emoji,
  //     });
  //   }
  // });

  // const countries: ICountry[] = [];
  // const seenCountries = new Set<string>();

  // cities.forEach((city) => {
  //   if (!seenCountries.has(city.country)) {
  //     seenCountries.add(city.country);
  //     countries.push({
  //       country: city.country,
  //       emoji: city.emoji,
  //     });
  //   }
  // });

  // const countries = Array.from(
  //   cities
  //     .reduce((acc, city) => {
  //       if (!acc.has(city.country)) {
  //         acc.set(city.country, { country: city.country, emoji: city.emoji });
  //       }
  //       return acc;
  //     }, new Map<string, ICountry>())
  //     .values()
  // );

  const countries = cities.reduce<ICountry[]>((acc, city) => {
    if (!acc.some((c) => c.country === city.country)) {
      acc.push({ country: city.country, emoji: city.emoji });
    }
    return acc;
  }, []);

  if (isCitiesLoading) return <Spinner />;

  if (!countries.length)
    return <Message message="Add your first city by clicking on the map" />;

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;

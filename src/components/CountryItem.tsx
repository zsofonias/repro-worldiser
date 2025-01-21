import { ICountry } from '../interface/city.interface';
import styles from './country-item.module.css';

interface ICountryItemProps {
  country: ICountry;
}

function CountryItem({ country }: ICountryItemProps) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;

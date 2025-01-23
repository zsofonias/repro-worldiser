import { useNavigate, useSearchParams } from 'react-router';
import styles from './map.module.css';

function Map() {
  const [searchParams] = useSearchParams();

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  const navigate = useNavigate();

  function handleOnClickMap() {
    navigate('/app/form');
  }

  return (
    <div onClick={handleOnClickMap} className={styles.mapContainer}>
      <h2>Map</h2>
      <p>
        Location: {lat}, {lng}
      </p>
    </div>
  );
}

export default Map;

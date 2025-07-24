import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

import styles from './map.module.css';

import { useCities } from '../context/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './UI/Button';
import { useUrlGeoPosition } from '../hooks/useUrlGeoPosition';

function Map() {
  const { lat, lng } = useUrlGeoPosition();
  const { cities } = useCities();
  const {
    getPosition,
    isLoading: isLoadingPosition,
    position: getLocationPosition,
  } = useGeolocation();

  const [mapPosition, setMapPosition] = useState<LatLngExpression>([lat, lng]);

  useEffect(() => {
    if (lat && lng) {
      setMapPosition([lat, lng]);
    }
  }, [lat, lng]);

  useEffect(() => {
    if (getLocationPosition) {
      setMapPosition([getLocationPosition.lat, getLocationPosition.lng]);
    }
  }, [getLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!getLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? 'Loading...' : 'Use your position'}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeMapCenter position={mapPosition} />
        <DetectMapClick />
      </MapContainer>
    </div>
  );
}

function ChangeMapCenter({ position }: { position: LatLngExpression }) {
  const map = useMap();
  map.setView(position);

  return null;
}

function DetectMapClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });

  return null;
}

export default Map;

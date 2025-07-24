import { useSearchParams } from 'react-router';

export function useUrlGeoPosition() {
  const [searchParams] = useSearchParams();

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  return {
    lat: Number(lat),
    lng: Number(lng),
  };
}

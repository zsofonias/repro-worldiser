import { useState } from 'react';

type Position = {
  lat: number;
  lng: number;
};

type props = {
  defaultPosition?: Position | null;
};

export function useGeolocation({ defaultPosition = null }: props = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<Position | null>(defaultPosition);
  const [error, setError] = useState<string | null>(null);

  function getPosition() {
    if (!navigator.geolocation) {
      return setError('Geolocation is not supported by your browser');
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return {
    isLoading,
    position,
    error,
    getPosition,
  };
}

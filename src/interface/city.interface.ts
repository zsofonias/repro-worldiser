export type Position = {
  lat: number;
  lng: number;
};

export interface ICity {
  cityName: string;
  country: string;
  emoji: string;
  date: string | Date;
  notes: string;
  position: Position;
  id?: number;
}

export interface ICountry {
  country: string;
  emoji: string;
}

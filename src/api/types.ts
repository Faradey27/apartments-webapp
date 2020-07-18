export enum RequestState {
  unset = 'unset',
  waiting = 'waiting',
  success = 'success',
  failure = 'failure',
}

export interface Apartment {
  id: number;
  name: string;
  capacity: number;
  location: string;
  available: boolean;
  image: string;
  price: Price;
}

export interface ApartmentsDetails extends Apartment {
  description: string;
  gallery: string[];
}

export interface Price {
  value: number;
  currency: string;
}

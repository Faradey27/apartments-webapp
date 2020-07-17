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
}

export interface ApartmentsDetails extends Apartment {
  description: string;
  gallery: string[];
}

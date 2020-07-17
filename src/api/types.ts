export enum RequestState {
  unset = 'unset',
  waiting = 'waiting',
  success = 'success',
  failure = 'failure',
}

export interface Apartment {
  id: number;
  name: string;
  available: boolean;
  image: string;
}

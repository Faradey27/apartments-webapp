import { homepage } from '../../package.json';
import {
  Apartment,
} from './types';

export * from './types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const request = async (method: string, { path }: { path: string }) => {
  const url = `${process.env.REACT_APP_API_URL || homepage}${path}`;

  const params = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const rawResponse = await fetch(url, params);
  const response = await rawResponse.json();

  if (!rawResponse.ok) {
    throw response;
  }

  return response;
}

export const fetchApartments = async (): Promise<{ totalNumber: number, items: Apartment[] }> => {
  // small trick to make requests feel like real
  await delay(500);

  return request('GET', { path: '/api/apartments.json' });
};

import { homepage } from '../../package.json';
import { Apartment, ApartmentsDetails } from './types';

export * from './types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const request = async (
  method: string,
  { path, body }: { path: string; body?: string }
) => {
  const url = `${process.env.REACT_APP_API_URL || homepage}${path}`;

  const params = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    // TODO should be always follow, manual - is a trick to prevent redirect when we send request to non existing endpoint
    redirect: method === 'POST' ? ('manual' as const) : ('follow' as const),
    body,
  };

  const rawResponse = await fetch(url, params);
  const response = await rawResponse.json();

  if (!rawResponse.ok) {
    throw response;
  }

  return response;
};

// TODO we ignore params as filtering should happen on server
export const fetchApartments = async (_params: {
  fromDate: string | null;
  toDate: string | null;
}): Promise<{
  totalNumber: number;
  items: Apartment[];
}> => {
  // small trick to make requests feel like real
  await delay(500);

  return request('GET', { path: '/api/apartments.json' });
};

export const fetchApartmentsDetails = async (
  id: number
): Promise<ApartmentsDetails> => {
  // small trick to make requests feel like real
  await delay(500);

  return request('GET', { path: `/api/apartments/${id}.json` });
};

export const bookApartments = async (params: { [key: string]: string }) => {
  // small trick to make requests feel like real
  await delay(1000);

  return request('POST', {
    path: `/api/booking/`,
    body: JSON.stringify(params),
  });
};

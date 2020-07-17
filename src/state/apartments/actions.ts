import { ActionType, createAsyncAction } from 'typesafe-actions';

import { Apartment } from '../../api';

export const fetchApartmentsAsyncAction = createAsyncAction(
  '@apartments/FETCH_APARTEMNTS_REQUEST',
  '@apartments/FETCH_APARTEMNTS_HISTORY_SUCCESS',
  '@apartments/FETCH_APARTEMNTS_HISTORY_FAILURE'
)<void, { totalNumber: number; items: Apartment[] }, Error>();

export type ApartmentsAction = ActionType<typeof fetchApartmentsAsyncAction>;

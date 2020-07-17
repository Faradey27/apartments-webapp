import { ActionType, createAsyncAction } from 'typesafe-actions';

import { Apartment, ApartmentsDetails } from '../../api';

export const fetchApartmentsAsyncAction = createAsyncAction(
  '@apartments/FETCH_APARTEMNTS_REQUEST',
  '@apartments/FETCH_APARTEMNTS_SUCCESS',
  '@apartments/FETCH_APARTEMNTS_FAILURE'
)<void, { totalNumber: number; items: Apartment[] }, Error>();

export const fetchApartmentsDetailsAsyncAction = createAsyncAction(
  '@apartments/FETCH_APARTEMNTS_DETAILS_REQUEST',
  '@apartments/FETCH_APARTEMNTS_DETAILS_SUCCESS',
  '@apartments/FETCH_APARTEMNTS_DETAILS_FAILURE'
)<
  number,
  { data: ApartmentsDetails; id: number },
  { error: Error; id: number }
>();

export type ApartmentsAction =
  | ActionType<typeof fetchApartmentsAsyncAction>
  | ActionType<typeof fetchApartmentsDetailsAsyncAction>;

import { RootState } from '../reducer';

export const selectApartments = (state: RootState) =>
  state.apartments.items;

export const selectApartmentsRequestState = (state: RootState) =>
  state.apartments.requestState;


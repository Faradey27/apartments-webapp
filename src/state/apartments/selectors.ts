import { RootState } from '../reducer';

export const selectApartments = (state: RootState) =>
  state.apartments.items.filter((apartment) => apartment.available);

export const selectApartmentsRequestState = (state: RootState) =>
  state.apartments.requestState;

export const selectApartmentsDetails = (state: RootState, id: number) => {
  const apartmentsDetails = state.apartments.apartmentsDetails[id];
  return apartmentsDetails?.data;
};

export const selectApartmentsRequestStateDetails = (
  state: RootState,
  id: number
) => {
  const apartmentsDetails = state.apartments.apartmentsDetails[id];
  return apartmentsDetails?.requestState;
};

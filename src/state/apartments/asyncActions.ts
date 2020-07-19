import * as api from '../../api';
import { RootThunkAction } from '../action';
import {
  bookApartmentsAsyncAction,
  fetchApartmentsAsyncAction,
  fetchApartmentsDetailsAsyncAction,
} from './actions';

export const fetchApartmentsAction = (
  fromDate: string | null,
  toDate: string | null
): RootThunkAction => {
  return async (dispatch) => {
    dispatch(fetchApartmentsAsyncAction.request());

    try {
      const res = await api.fetchApartments({ fromDate, toDate });
      dispatch(fetchApartmentsAsyncAction.success(res));
    } catch (e) {
      dispatch(fetchApartmentsAsyncAction.failure(e));
    }
  };
};

export const fetchApartmentsDetailsAction = (id: number): RootThunkAction => {
  return async (dispatch) => {
    dispatch(fetchApartmentsDetailsAsyncAction.request(id));

    try {
      const res = await api.fetchApartmentsDetails(id);
      dispatch(fetchApartmentsDetailsAsyncAction.success({ data: res, id }));
    } catch (e) {
      dispatch(fetchApartmentsDetailsAsyncAction.failure({ error: e, id }));
    }
  };
};

// TODO implement state in reducer
export const bookApartmentsAction = ({
  id,
  fromDate,
  toDate,
  cardNumber,
  fullName,
  expirationDate,
  cvv,
}: {
  [key: string]: string;
}): RootThunkAction => {
  return async (dispatch) => {
    dispatch(bookApartmentsAsyncAction.request(Number(id)));

    try {
      await api.bookApartments({
        id,
        fromDate,
        toDate,
        cardNumber,
        fullName,
        expirationDate,
        cvv,
      });
      dispatch(bookApartmentsAsyncAction.success(Number(id)));
    } catch (e) {
      dispatch(bookApartmentsAsyncAction.failure({ error: e, id: Number(id) }));
    }
  };
};

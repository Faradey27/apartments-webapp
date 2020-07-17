import * as api from '../../api';
import { RootThunkAction } from '../action';
import {
  fetchApartmentsAsyncAction,
  fetchApartmentsDetailsAsyncAction,
} from './actions';

export const fetchApartmentsAction = (): RootThunkAction => {
  return async (dispatch) => {
    dispatch(fetchApartmentsAsyncAction.request());

    try {
      const res = await api.fetchApartments();
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

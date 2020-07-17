import * as api from '../../api';
import { RootThunkAction } from '../action';
import {
  fetchApartmentsAsyncAction,
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

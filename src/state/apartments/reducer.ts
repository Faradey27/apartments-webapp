import { getType } from 'typesafe-actions';

import {
  Apartment,
  RequestState,
} from '../../api/types';
import {
  ApartmentsAction,
  fetchApartmentsAsyncAction
} from './actions';

export interface ApartmentsState {
  items: Apartment[];
  requestState: RequestState;
}

const initialState: ApartmentsState = {
  items: [],
  requestState: RequestState.unset,
};

export const apartmentsReducer = (state = initialState, action: ApartmentsAction) => {
  switch (action.type) {
    case getType(fetchApartmentsAsyncAction.request): {
      return {
        ...state,
        requestState: RequestState.waiting,
      };
    }
    case getType(fetchApartmentsAsyncAction.success): {
      return {
        ...state,
        items: action.payload.items,
        requestState: RequestState.success,
      };
    }
    case getType(fetchApartmentsAsyncAction.failure): {
      return {
        ...state,
        requestState: RequestState.failure,
      };
    }

    default: {
      return state;
    }
  }
};

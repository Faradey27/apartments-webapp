import { getType } from 'typesafe-actions';

import { Apartment, ApartmentsDetails, RequestState } from '../../api/types';
import {
  ApartmentsAction,
  fetchApartmentsAsyncAction,
  fetchApartmentsDetailsAsyncAction,
} from './actions';

export interface ApartmentsState {
  items: Apartment[];
  apartmentsDetails: {
    [key: number]: {
      requestState: RequestState;
      data: ApartmentsDetails;
    };
  };
  requestState: RequestState;
}

const initialState: ApartmentsState = {
  items: [],
  apartmentsDetails: {},
  requestState: RequestState.unset,
};

export const apartmentsReducer = (
  state = initialState,
  action: ApartmentsAction
) => {
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

    case getType(fetchApartmentsDetailsAsyncAction.request): {
      return {
        ...state,
        apartmentsDetails: {
          ...state.apartmentsDetails,
          [action.payload]: {
            requestState: RequestState.waiting,
          },
        },
      };
    }
    case getType(fetchApartmentsDetailsAsyncAction.success): {
      return {
        ...state,
        apartmentsDetails: {
          ...state.apartmentsDetails,
          [action.payload.id]: {
            data: action.payload.data,
            requestState: RequestState.success,
          },
        },
      };
    }
    case getType(fetchApartmentsDetailsAsyncAction.failure): {
      return {
        ...state,
        [action.payload.id]: {
          requestState: RequestState.failure,
        },
      };
    }

    default: {
      return state;
    }
  }
};

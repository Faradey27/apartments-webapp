import { combineReducers } from 'redux';

import { apartmentsReducer, ApartmentsState } from './apartments/reducer';

export interface RootState {
  apartments: ApartmentsState;
}

export default combineReducers({
  apartments: apartmentsReducer,
});

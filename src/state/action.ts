import { ThunkAction } from 'redux-thunk';

import { ApartmentsAction } from './apartments/actions';
import { RootState } from './reducer';

export type RootAction = ApartmentsAction;
export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>;

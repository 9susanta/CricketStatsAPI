import { ActionReducerMap } from '@ngrx/store';
import { SharedState } from './shared/shared.state';
import { SHARED_STATE_NAME } from './shared/shared.selector';
import { SharedReducer } from './shared/shared.reducer';
import { AuthState } from '../auth/state/auth.state';
import { AUTH_STATE } from '../auth/state/auth.selector';
import { AuthReducer } from '../auth/state/auth.reducer';

export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
  [AUTH_STATE]: AuthState;
}
export const appReducer: ActionReducerMap<AppState> = {
  [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE]: AuthReducer,
};

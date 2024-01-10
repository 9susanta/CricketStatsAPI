import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const AUTH_STATE = 'auth';
const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE);

export const isAuthenticatedSelector = createSelector(getAuthState, (state) => {
  return state.user ? true : false;
});

import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const LOGIN = '[auth] login';
export const LOGIN_SUCCESS = '[auth] login Success';
export const LOGIN_FAIL = '[auth] login Fail';

export const AUTO_LOGIN_ACTION = '[auth page] auto login';

export const login = createAction(
  LOGIN,
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: User }>()
);

export const SIGNUP = '[auth page] signup start';
export const SIGNUP_SUCCESS = '[auth page] signup success';

export const signupStart = createAction(
  SIGNUP,
  props<{ email: string; password: string }>()
);

export const signupSuccess = createAction(
  SIGNUP_SUCCESS,
  props<{ user: User }>()
);

export const autoLogin = createAction(AUTO_LOGIN_ACTION);

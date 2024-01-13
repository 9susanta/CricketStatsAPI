import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  autoLogin,
  login,
  loginSuccess,
  signupStart,
  signupSuccess,
} from './auth.actions';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { AuthService } from '../service/auth.service';
import {
  setErrorMessage,
  setLoadingSpinner,
} from 'src/app/store/shared/shared.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const user = this.authService.getDecodeToken(
              data.token,
              data.refreshToken
            );
            this.authService.setUserInLocalStorage(user);
            return loginSuccess({ user });
          }),
          catchError((errResp) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = errResp.error.error.message
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    )
  );
  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess, signupSuccess]),
        tap((action) => {
          debugger;
          this.store.dispatch(setErrorMessage({ message: '' }));
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        return this.authService.signup(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const user = this.authService.getDecodeToken(
              data.token,
              data.refreshToken
            );
            this.authService.setUserInLocalStorage(user);
            return loginSuccess({ user });
          }),
          catchError((errResp) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = errResp.error.error.message;
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });
  autoLogin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(autoLogin),
        mergeMap((action) => {
          debugger;
          const user = this.authService.getUserFromLocalStorage();
          return of(loginSuccess({ user }));
        })
      );
    }
  );
}

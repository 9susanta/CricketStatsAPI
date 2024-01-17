import { CanActivateFn, Router } from '@angular/router';
import { isAuthenticatedSelector } from './auth/state/auth.selector';
import { map } from 'rxjs';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';

export const authGuardGuard: CanActivateFn = (route, state) => {

  return inject(Store<AppState>).select(isAuthenticatedSelector).pipe(
    map((authenticate) => {
      if (!authenticate) {
        return inject(Router).createUrlTree(['auth']);
      }
      return true;
    })
  );
};

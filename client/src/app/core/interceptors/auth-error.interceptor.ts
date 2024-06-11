import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import {
  EMPTY,
  catchError,
  concatMap,
  filter,
  finalize,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { SessionService } from '@services/session.service';

export const authErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const session = inject(SessionService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      // if StatusCode response is 401
      if (err.status === HttpStatusCode.Unauthorized) {
        // Verify if refreshing process isn't started
        if (!session.isRefreshing) {
          session.isRefreshing = true;

          return session.refreshTokens().pipe(
            finalize(() => (session.isRefreshing = false)),
            concatMap((res) => {
              // Update tokens
              session.saveTokens(res);

              // Retry pending requests
              session.notifyTokenRefreshed(res.accessToken);
              const clonedReq = session.addTokenHeader(req);
              return next(clonedReq);
            }),
            catchError(() => {
              // Error on refreshing
              session.signOut();
              return EMPTY;
            })
          );
        } else {
          // Put in a queue to try again after refresh session
          return session.onTokenRefreshed().pipe(
            filter((token) => token !== null),
            take(1),
            switchMap(() => {
              return next(session.addTokenHeader(req));
            })
          );
        }
      }

      // Return error message
      return throwError(() =>
        Array.isArray(err.error.message)
          ? err.error.message[0]
          : err.error.message
      );
    })
  );
};

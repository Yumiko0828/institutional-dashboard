import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import {
  EMPTY,
  Observable,
  catchError,
  concatMap,
  filter,
  finalize,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { SessionService } from '../services/session.service';

export const authErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const session = inject(SessionService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      console.log('****API ERROR INTERCEPTOR****');
      if (err.status === HttpStatusCode.Unauthorized) {
        console.log('****INICIANDO REFRESH TOKEN****');

        if (!session.isRefreshing) {
          session.isRefreshing = true;

          return session.refreshTokens().pipe(
            finalize(() => (session.isRefreshing = false)),
            concatMap((res) => {
              session.saveTokens(res);
              session.notifyTokenRefreshed(res.accessToken);
              console.log('****TOKEN ACTUALIZADO****');

              const clonedReq = session.addTokenHeader(req);
              return next(clonedReq);
            }),
            catchError(() => {
              console.log('*******ERROR EN EL REFRESH TOKEN********');
              session.signOut();
              return EMPTY;
            })
          );
        } else {
          console.log('****REFRESH TOKEN EN PROCESO, SE PONE EN COLA****');
          return session.onTokenRefreshed().pipe(
            filter((token) => token !== null),
            take(1),
            switchMap((token) => {
              console.log('SEGUNDO INTENTO', token);
              return next(session.addTokenHeader(req));
            })
          );
        }
      }
      return throwError(() =>
        Array.isArray(err.error.message)
          ? err.error.message[0]
          : err.error.message
      );
    })
  );
};

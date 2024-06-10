import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionService } from '@services/session.service';
import { EMPTY, concatMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('****API INTERCEPTOR****');
  if (req.url.includes('/auth')) return next(req);

  const session = inject(SessionService);

  const { accessToken, refreshToken } = session.getTokens();

  if (!accessToken || !refreshToken) {
    session.signOut();
    return EMPTY;
  }

  const clonedRequest = session.addTokenHeader(req);

  return next(clonedRequest);
};

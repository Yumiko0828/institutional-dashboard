import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '@services/session.service';

export const authGuard: CanActivateFn = (route, state) => {
  const session = inject(SessionService);
  const router = inject(Router);

  if (!session.isAuth()) {
    session.signOut(false);
    const urlTree = router.createUrlTree(['/login']);
    return urlTree;
  }

  return true;
};

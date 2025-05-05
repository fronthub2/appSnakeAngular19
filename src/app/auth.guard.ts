import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from './services/localstorage.service';

export const layoutGuard: CanActivateFn = () => {
  const lsService = inject(LocalStorageService);
  const router = inject(Router);

  if (!lsService.getUser()) {
    return router.createUrlTree(['/login']);
  }

  return true;
};

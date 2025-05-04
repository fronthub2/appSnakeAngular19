import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpService } from './services/http.service';

export const layoutGuard: CanActivateFn = () => {
  const httpService = inject(HttpService);
  const router = inject(Router);

  return httpService.hasUsers().pipe(
    map((hasUsers) => {
      if (!hasUsers) {
        return router.createUrlTree(['/login']);
      }

      return true;
    })
  );
};

export const loginGuard: CanActivateFn = () => {
  const httpService = inject(HttpService);
  const router = inject(Router);

  return confirm('Вы уверены? Ваши данные будут удалены')

  // return httpService.hasUsers().pipe(
  //   map((hasUsers) => {
  //     if (hasUsers) {
  //       return router.createUrlTree(['']);
  //     }

  //     return true;
  //   })
  // );
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpService } from './services/http.service';

export const authGuard: CanActivateFn = () => {
  const httpService = inject(HttpService);
  const router = inject(Router);

  return httpService.hasUsers().pipe(
    map((hasUsers) => {
      if (!hasUsers) {
        // Если пользователей нет, пускае
        return router.createUrlTree(['/login']);
      }
      // Если пользователи нет, кидаем в /login
      return true;
    })
  );
};

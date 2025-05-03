import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { gameRoutes } from './pages/games/games.routes';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/profile/profile.component').then(
            (c) => c.ProfileComponent
          ),
      },
      ...gameRoutes,
    ],
  },
];

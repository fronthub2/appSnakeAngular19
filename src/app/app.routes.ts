import { Routes } from '@angular/router';
import { layoutGuard } from './auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { gameRoutes } from './pages/games/games.routes';

export const routes: Routes = [
  {
    path: '',
    canActivate: [layoutGuard],
    component: LayoutComponent,
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
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [loginGuard],
  },
];

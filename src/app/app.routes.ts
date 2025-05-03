import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { gameRoutes } from './pages/games/games.routes';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'prefix',
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

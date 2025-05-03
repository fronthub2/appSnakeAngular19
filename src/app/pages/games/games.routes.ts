import { Routes } from '@angular/router';
import { SnakeBoardComponent } from './snake/snake-board/snake-board.component';

export const gameRoutes: Routes = [
  {
    path: 'games',
    loadComponent: () =>
      import('./games.component').then((c) => c.GamesComponent),
  },
  {
    path: 'games/snake-rules',
    loadComponent: () =>
      import('./snake/snake-rules/snake-rules.component').then(
        (c) => c.SnakeRulesComponent
      ),
  },
  {
    path: 'games/snake-board',
    loadComponent: () =>
      import('./snake/snake-board/snake-board.component').then(
        (c) => c.SnakeBoardComponent
      ),
  },
];

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Coords {
  x: number;
  y: number;
}

export interface Food {
  name: string;
  icon: string;
}

@Injectable({
  providedIn: 'root',
})
export class SnakeService {
  private snake: Coords[] = [{ x: 0, y: 10 }];
  private food: Coords = { x: 15, y: 15 };
  private direction: string = 'right';
  private boardSize: number = 20;

  private gameOver$ = new BehaviorSubject(false);

  private score$ = new BehaviorSubject<number>(0);

  private generateFood(): void {
    this.food = {
      x: Math.floor(Math.random() * this.boardSize),
      y: Math.floor(Math.random() * this.boardSize),
    };
  }

  getSnake(): Coords[] {
    return this.snake;
  }

  getFood(): Coords {
    return this.food;
  }

  getScore(): Observable<number> {
    return this.score$.asObservable();
  }

  getGameOver(): Observable<boolean> {
    return this.gameOver$.asObservable();
  }

  move(): void {
    if (this.gameOver$.value) return;

    const head = { ...this.snake[0] };

    switch (this.direction) {
      case 'right':
        head.x++;
        break;
      case 'left':
        head.x--;
        break;
      case 'up':
        head.y--;
        break;
      case 'down':
        head.y++;
        break;
    }

    if (
      head.x < 0 ||
      head.x >= this.boardSize ||
      head.y < 0 ||
      head.y >= this.boardSize
    ) {
      this.gameOver$.next(true);
      return;
    }

    if (
      this.snake.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      this.gameOver$.next(true);
      return;
    }

    this.snake.unshift(head);

    if (head.x === this.food.x && head.y === this.food.y) {
      this.score$.next(this.score$.value + 1);
      this.generateFood();
    } else {
      this.snake.pop();
    }
  }

  setDirection(direction: string): void {
    const oppositeDirections = {
      right: 'left',
      left: 'right',
      up: 'down',
      down: 'up',
    };

    if (
      oppositeDirections[direction as keyof typeof oppositeDirections] !==
      this.direction
    ) {
      this.direction = direction;
    }
  }

  resetGame(): void {
    this.snake = [{x: 0, y: 10}]
    this.direction = 'right';
    this.gameOver$.next(false);
    this.score$.next(0);
    this.generateFood();
  }
}

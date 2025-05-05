import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  combineLatest,
  interval,
  Observable,
  Subject,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import {
  IUser,
  LocalStorageService,
} from '../../../../services/localstorage.service';
import { SnakeRulesService } from '../snake-rules.service';
import { SnakeService } from '../snake.service';

@Component({
  selector: 'app-snake-board',
  imports: [CommonModule],
  templateUrl: './snake-board.component.html',
  styleUrl: './snake-board.component.scss',
})
export class SnakeBoardComponent implements OnInit, OnDestroy {
  private gameService = inject(SnakeService);
  private rulesService = inject(SnakeRulesService);
  private lsService = inject(LocalStorageService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private destroy$ = new Subject<void>();
  private gameOver$ = new Subject<void>();

  private user: IUser | null = this.lsService.getUser();

  over$: Observable<boolean> = this.gameService.getGameOver();
  score$: Observable<number> = this.gameService.getScore();

  speed!: string;
  color!: string;
  food!: string;

  board: number[][] = Array(20)
    .fill(0)
    .map(() => Array(20).fill(0));

  ngOnInit(): void {
    this.gameService.resetGame();
    this.getRules();
    this.startGame();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        this.gameService.setDirection('up');
        break;
      case 'ArrowDown':
        this.gameService.setDirection('down');
        break;
      case 'ArrowLeft':
        this.gameService.setDirection('left');
        break;
      case 'ArrowRight':
        this.gameService.setDirection('right');
        break;
    }
  }

  private getRules(): void {
    combineLatest([
      this.rulesService.getSpeed(),
      this.rulesService.getColor(),
      this.rulesService.getFood(),
    ])
      .pipe(
        tap(([speed, color, food]) => {
          this.speed = speed;
          this.color = color;
          this.food = food;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private startGame(): void {
    interval(Number(this.speed) * 1000)
      .pipe(
        withLatestFrom(this.over$),
        tap(([_, gameOver]) => {
          this.gameService.move();
          this.updateBoard();

          if (gameOver) {
            this.handleGameOver();
          }
        }),
        takeUntil(this.gameOver$),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private handleGameOver() {
    this.updateScore();
    this.gameOver$.next();
    this.router.navigate(['/games'], { relativeTo: this.route });
  }

  private updateBoard(): void {
    this.board = Array(20)
      .fill(0)
      .map(() => Array(20).fill(0));

    this.gameService.getSnake().forEach((segment) => {
      this.board[segment.y][segment.x] = 1;
    });

    const food = this.gameService.getFood();
    this.board[food.y][food.x] = 2;
  }

  private updateScore(): void {
    this.score$
      .pipe(
        tap((score) => {
          if (score === 0 || !this.user) return;

          this.user.score.push(score);
          this.lsService.setUser(this.user);
          console.log(score);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

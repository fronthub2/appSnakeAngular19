import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  combineLatest,
  interval,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import { HttpService, IUser } from '../../../../services/http.service';
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
  private settingService = inject(SnakeRulesService);
  private httpService = inject(HttpService);
  // private router = inject(Router);
  // private route = inject(ActivatedRoute);

  private destroy$ = new Subject<void>();
  private gameOver$ = new Subject<void>();

  user$: Observable<IUser | null> = this.httpService.getUser();
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
      this.settingService.getSpeed(),
      this.settingService.getColor(),
      this.settingService.getFood(),
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
            this.updateScore();
            this.gameOver$.next();
            // this.router.navigate(['/games'], { relativeTo: this.route });
          }
        }),
        takeUntil(this.gameOver$),
        takeUntil(this.destroy$)
      )
      .subscribe();
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
    combineLatest([this.user$, this.score$])
      .pipe(
        switchMap(([user, score]) => {
          if (!user) return of(null);
          if (score === 0) return of(null);
          user.score.push(score);
          return this.httpService.updateUser(user);
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

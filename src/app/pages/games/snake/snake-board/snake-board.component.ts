import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  combineLatest,
  interval,
  Observable,
  Subject,
  take,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import {
  IUser,
  LocalStorageService,
} from '../../../../services/localstorage.service';
import { DialogComponent } from '../../../../shared/dialog/dialog.component';
import { SnakeRulesService } from '../snake-rules.service';
import { SnakeService } from '../snake.service';

@Component({
  selector: 'app-snake-board',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './snake-board.component.html',
  styleUrl: './snake-board.component.scss',
})
export class SnakeBoardComponent implements OnInit, OnDestroy {
  private gameService = inject(SnakeService);
  private rulesService = inject(SnakeRulesService);
  private lsService = inject(LocalStorageService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  private destroy$ = new Subject<void>();
  private gameOver$ = new Subject<void>();

  private user: IUser | null = this.lsService.getUser();
  private isGameRunning = false;

  over$: Observable<boolean> = this.gameService.getGameOver();
  score$: Observable<number> = this.gameService.getScore();

  countdown: number | null = 3;
  speed: string = '1';
  color: string = 'green';
  food: string = 'apple';

  board: number[][] = Array(20)
    .fill(0)
    .map(() => Array(20).fill(0));

  ngOnInit(): void {
    this.gameService.resetGame();
    this.getRules();
    this.startCountdown();
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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: boolean) => {
        if (result) {
          this.gameService.resetGame();
          this.startCountdown();
        } else {
          this.router.navigate(['/games']);
        }
      });
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

  private startCountdown(): void {
    if (this.isGameRunning) return;
    this.isGameRunning = true;
    this.countdown = 3;

    interval(1000)
      .pipe(
        take(4),
        tap((tick) => {
          this.countdown = 3 - tick;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        complete: () => {
          this.countdown = null;
          this.startGame();
        },
      });
  }

  private startGame(): void {
    const speedMs = Number(this.speed) * 1000;

    interval(speedMs)
      .pipe(
        withLatestFrom(this.over$),
        tap(([_, gameOver]) => {
          this.gameService.move();
          this.updateBoard();

          if (gameOver) {
            this.updateScore();
            this.gameOver$.next();
            this.isGameRunning = false;
            this.openDialog();
          }
        }),
        takeUntil(this.gameOver$),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private updateBoard(): void {
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 20; x++) {
        this.board[y][x] = 0;
      }
    }

    this.gameService.getSnake().forEach((segment) => {
      this.board[segment.y][segment.x] = 1;
    });

    const food = this.gameService.getFood();
    this.board[food.y][food.x] = 2;
  }

  private updateScore(): void {
    this.score$
      .pipe(
        take(1),
        tap((score) => {
          if (score === 0 || !this.user) return;
          this.user.score.push(score);
          this.lsService.setUser(this.user);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
    this.destroy$.next();
    this.destroy$.complete();
  }
}

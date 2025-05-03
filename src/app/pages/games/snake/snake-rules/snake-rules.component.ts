import { AsyncPipe } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { RouterLink } from '@angular/router';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { SnakeRulesService } from '../snake-rules.service';
import { Food } from '../snake.service';
import { Item, SnakeRules } from './snake-rules.models';

@Component({
  selector: 'app-snake-rules',
  imports: [RouterLink, ReactiveFormsModule, FormsModule, MatRadioModule,AsyncPipe,MatButtonModule],
  templateUrl: './snake-rules.component.html',
  styleUrl: './snake-rules.component.scss',
})
export class SnakeRulesComponent implements OnDestroy {
  private rulesService = inject(SnakeRulesService);
  private destroy$ = new Subject<void>();

  settings: (Item<string> | Item<Food>)[] = SnakeRules;

  form = new FormGroup({
    speed: new FormControl(this.rulesService.speed.value),
    color: new FormControl(this.rulesService.color.value),
    food: new FormControl(this.rulesService.food.value),
  });

  speed$: Observable<string> = this.rulesService.getSpeed();
  color$: Observable<string> = this.rulesService.getColor();
  food$: Observable<string> = this.rulesService.getFood();

  ngOnInit() {
    this.form.valueChanges
      .pipe(
        tap(({ speed, color, food }) => {
          if (!speed || !color || !food) return;

          this.rulesService.updateSetting(speed, color, food);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isFood(option: string | Food): option is Food {
    return typeof option !== 'string';
  }
}

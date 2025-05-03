import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnakeRulesService {
  speed = new BehaviorSubject<string>('0.1');
  color = new BehaviorSubject<string>('red');
  food = new BehaviorSubject<string>('burger');

  getSpeed(): Observable<string> {
    return this.speed.asObservable();
  }

  setSpeed(speed: string): void {
    this.speed.next(speed);
  }

  getColor(): Observable<string> {
    return this.color.asObservable();
  }

  setColor(color: string): void {
    this.color.next(color);
  }

  getFood(): Observable<string> {
    return this.food.asObservable();
  }

  setFood(food: string): void {
    this.food.next(food);
  }

  updateSetting(speed: string, color: string, food: string): void {
    this.speed.next(speed);
    this.color.next(color);
    this.food.next(food);
  }
}

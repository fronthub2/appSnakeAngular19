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

  getColor(): Observable<string> {
    return this.color.asObservable();
  }

  getFood(): Observable<string> {
    return this.food.asObservable();
  }

  updateSetting(speed: string, color: string, food: string): void {
    this.speed.next(speed);
    this.color.next(color);
    this.food.next(food);
  }
}

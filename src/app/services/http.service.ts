import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface IUser {
  id: number;
  name: string;
  avatarId: number;
  score: number[];
  theme: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000';
  private baseID = 1;

  private userSubject = new BehaviorSubject<IUser | null>(null);

  constructor() {
    this.getUserHttp()
      .pipe(tap((user) => this.userSubject.next(user)))
      .subscribe();
  }

  private getUserHttp(): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}/users/${this.baseID}`);
  }

  getUser(): Observable<IUser | null> {
    return this.userSubject.asObservable();
  }

  updateUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.baseUrl}/users/${this.baseID}`, user);
  }
}

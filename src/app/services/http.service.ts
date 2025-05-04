import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

export interface IUser {
  id: string;
  name: string;
  avatarId: number;
  score: number[];
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private http = inject(HttpClient);
  private baseUrl: string = 'http://localhost:3000';

  private userSubject = new BehaviorSubject<IUser | null>(null);

  constructor() {
    this.getUsers()
      .pipe(tap((users) => users.map((user) => this.userSubject.next(user))))
      .subscribe();
  }

  getUsers(): Observable<IUser[] | []> {
    return this.http.get<IUser[]>(`${this.baseUrl}/users`);
  }

  getUser(): Observable<IUser | null> {
    return this.userSubject.asObservable();
  }

  updateUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.baseUrl}/users/${user.id}`, user);
  }

  createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.baseUrl}/users`, user);
  }

  hasUsers(): Observable<boolean> {
    return this.http
      .get<IUser[]>(`${this.baseUrl}/users`)
      .pipe(map((users) => users.length > 0));
  }

  deleteUser() {
    return this.http.delete<IUser>(`${this.baseUrl}/users/1`);
  }
}

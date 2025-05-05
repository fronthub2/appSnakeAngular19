import { Injectable } from '@angular/core';

export interface IUser {
  id: string;
  name: string;
  score: number[];
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getUser(): IUser | null {
    const user = localStorage.getItem('user');
    if (!user) return null;

    return JSON.parse(user);
  }

  setUser(user: IUser): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  deleteUser() {
    localStorage.removeItem('user');
  }
}

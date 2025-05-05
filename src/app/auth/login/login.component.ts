import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import {
  IUser,
  LocalStorageService,
} from '../../services/localstorage.service';

@Component({
  selector: 'app-login',
  imports: [MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private localStorage = inject(LocalStorageService);
  private router = inject(Router);

  name!: string;

  constructor() {}

  addUser() {
    if (!this.name) return;

    const user: IUser = {
      id: '1',
      name: this.name,
      score: [],
    };
    this.localStorage.setUser(user);
    this.router.navigate(['']);
  }
}

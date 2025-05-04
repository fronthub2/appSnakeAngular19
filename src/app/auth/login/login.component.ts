import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { HttpService, IUser } from '../../services/http.service';

@Component({
  selector: 'app-login',
  imports: [MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private httpService = inject(HttpService);
  private destroy$ = new Subject<void>();
  private router = inject(Router);

  name!: string;

  constructor() {
    this.httpService.hasUsers().subscribe();
  }

  addUser() {
    if(!this.name) return;

    const user: IUser = {
      id: '1',
      name: this.name,
      avatarId: Math.floor(Math.random() * 4),
      score: [],
    };
    this.httpService
      .createUser(user)
      .pipe(
        tap(() => {
          this.router.navigate(['']);
          this.name = '';
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((c) => console.log('add', c));
  }
}

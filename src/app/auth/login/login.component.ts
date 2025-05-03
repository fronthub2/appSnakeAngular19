import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-login',
  imports: [MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private httpService = inject(HttpService);

  constructor() {
    this.httpService.hasUsers().subscribe();
  }
}

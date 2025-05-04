import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { HttpService } from '../services/http.service';
import { sidenavMenu } from './layout.models';

@Component({
  selector: 'app-layout',
  imports: [
    MatSidenavModule,
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  private httpService = inject(HttpService);
  private router = inject(Router);

  menuItems = sidenavMenu;

  logOut() {
    this.httpService.deleteUser().subscribe();
    this.router.navigate(['/login']);
  }
}

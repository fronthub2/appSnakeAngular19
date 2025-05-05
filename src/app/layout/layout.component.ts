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
import { LocalStorageService } from '../services/localstorage.service';
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
  private localStorage = inject(LocalStorageService);
  private router = inject(Router);

  menuItems = sidenavMenu;

  logOut() {
    this.localStorage.deleteUser();
    this.router.navigate(['/login']);
  }
}

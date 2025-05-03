import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CardComponent } from '../../shared/card/card.component';
import { GameItems } from './games.models';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-games',
  imports: [RouterLink, CommonModule, CardComponent, MatTooltipModule],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss',
})
export class GamesComponent {
  gameItems = GameItems;
}

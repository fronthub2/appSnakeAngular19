import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-card',
  imports: [CommonModule,MatTooltipModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() title!: string;
  @Input() bgClass!: string;
  @Input() img!: string;
  @Input() reliese!: boolean;
}

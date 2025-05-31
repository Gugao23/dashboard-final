import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-card-summary',
  standalone: true,
  imports: [CommonModule], // Adicionar CommonModule aos imports
  templateUrl: './card-summary.component.html',
  styleUrls: ['./card-summary.component.css']
})
export class CardSummaryComponent {
  @Input() title: string = '';
  @Input() value: string | number = '';
  @Input() colorClass: string = ''; // e.g., 'bg-blue', 'bg-red', 'bg-green'

  constructor() { }
}


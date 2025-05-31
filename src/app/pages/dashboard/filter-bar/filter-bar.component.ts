import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Necessário para [(ngModel)]

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [FormsModule], // Adicionar FormsModule aqui
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent {
  @Output() filterChange = new EventEmitter<any>();

  filterCriteria = {
    nome: '',
    cidade: '',
    estado: ''
  };

  constructor() { }

  onFilterChange(): void {
    this.filterChange.emit(this.filterCriteria);
  }

  onSearchClick(): void {
    this.onFilterChange();
  }
}


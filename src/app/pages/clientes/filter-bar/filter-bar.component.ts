import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent {
  nome = '';
  email = '';
  @Output() filterChange = new EventEmitter<{ nome: string; email: string }>();

  atualizaFiltro() {
    this.filterChange.emit({
      nome: this.nome,
      email: this.email
    });
  }
}

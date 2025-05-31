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
  cidade = '';
  estado = '';
  @Output() filterChange = new EventEmitter<{ nome: string; cidade: string; estado: string }>();

  atualizaFiltro() {
    this.filterChange.emit({
      nome: this.nome,
      cidade: this.cidade,
      estado: this.estado
    });
  }
}

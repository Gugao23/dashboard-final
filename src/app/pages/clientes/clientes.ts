import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientTableComponent } from './client-table/client-table.component';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { SidebarComponent } from "../../layout/sidebar/sidebar";
import { HeadereComponent } from "./header/header.component";

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, ClientTableComponent, FilterBarComponent, SidebarComponent, HeadereComponent],
  templateUrl: './clientes.html',
  styleUrls: ['./clientes.scss']
})
export class ClientesComponent {
  filterCriteria = { nome: '', cidade: '', estado: '' };

  onFilterChange(filtro: { nome: string; cidade: string; estado: string }) {
    this.filterCriteria = filtro;
  }
}
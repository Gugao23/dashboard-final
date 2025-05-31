import { Component, ViewChild } from '@angular/core';
import { CardsComponent } from "./cards/cards";
import { TabelaComponent } from "./tabela/tabela";
import { AddformComponent } from "./addform/addform";
import { SidebarComponent } from "../../layout/sidebar/sidebar";

@Component({
  selector: 'app-estoque',
  imports: [CardsComponent, TabelaComponent, AddformComponent, SidebarComponent],
  templateUrl: './estoque.html',
  styleUrl: './estoque.scss'
})
export class Estoque {
  @ViewChild(TabelaComponent) tabela!: TabelaComponent;

  atualizarTabela() {
    if (this.tabela) {
      this.tabela.carregarProdutos();
    }
  }
}
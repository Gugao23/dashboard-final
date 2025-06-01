import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.html',
  styleUrls: ['./cards.scss']
})
export class CardsComponent implements OnInit {
  totalProdutos: number = 0;
  estoqueStatus: 'verde' | 'amarelo' | 'vermelho' = 'verde';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.atualizarTotal();
  }

  atualizarTotal() {
    this.http.get<any[]>('http://localhost:3000/produtosEstoque').subscribe(produtos => {
      this.totalProdutos = produtos.reduce((soma, item) => soma + (item.quantidade || 0), 0);

      // Define a cor do card de acordo com o total
      if (this.totalProdutos > 200) {
        this.estoqueStatus = 'verde';
      } else if (this.totalProdutos >= 100) {
        this.estoqueStatus = 'amarelo';
      } else {
        this.estoqueStatus = 'vermelho';
      }
    });
  }
}
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
  // Total de produtos em estoque (soma das quantidades)
  totalProdutos: number = 0;

  // Status visual do estoque: verde, amarelo ou vermelho
  estoqueStatus: 'verde' | 'amarelo' | 'vermelho' = 'verde';

  // Injeta o serviço HttpClient para requisições HTTP
  constructor(private http: HttpClient) {}

  // Ao iniciar o componente, atualiza o total de produtos
  ngOnInit() {
    this.atualizarTotal();
  }

  // Busca todos os produtos e calcula o total de itens em estoque
  atualizarTotal() {
    this.http.get<any[]>('http://localhost:3000/produtosEstoque').subscribe(produtos => {
      // Soma todas as quantidades dos produtos
      this.totalProdutos = produtos.reduce((soma, item) => soma + (item.quantidade || 0), 0);

      // Define a cor do card de acordo com o total de produtos
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
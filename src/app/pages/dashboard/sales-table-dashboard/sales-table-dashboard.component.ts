import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SaleItem {
  id: number;
  produto: string;
  tamanho: string;
  cor: string;
  quantidade: number;
  preco: string;
  status: string;
}

@Component({
  selector: 'app-sales-table-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-table-dashboard.component.html',
  styleUrls: ['./sales-table-dashboard.component.css']
})
export class SalesTableDashboardComponent implements OnInit {

  sales: SaleItem[] = [
    { id: 1, produto: 'Camiseta', tamanho: 'M', cor: 'Vermelho', quantidade: 4, preco: 'R$ 220,00', status: 'A caminho' },
    { id: 2, produto: 'Calça', tamanho: 'G', cor: 'Azul', quantidade: 4, preco: 'R$ 105,00', status: 'Em separação' },
    { id: 3, produto: 'Moletom', tamanho: 'P', cor: 'Preto', quantidade: 8, preco: 'R$ 200,00', status: 'Esperando Pagamento' },
    { id: 4, produto: 'Vestido', tamanho: 'M', cor: 'Verde', quantidade: 3, preco: 'R$ 160,00', status: 'A caminho' },
    { id: 5, produto: 'Camiseta', tamanho: 'M', cor: 'Vermelho', quantidade: 4, preco: 'R$ 220,00', status: 'A caminho' },
    { id: 6, produto: 'Calça', tamanho: 'G', cor: 'Azul', quantidade: 4, preco: 'R$ 105,00', status: 'Em separação' },
    { id: 7, produto: 'Moletom', tamanho: 'P', cor: 'Preto', quantidade: 8, preco: 'R$ 200,00', status: 'Esperando Pagamento' },
    { id: 8, produto: 'Vestido', tamanho: 'M', cor: 'Verde', quantidade: 3, preco: 'R$ 160,00', status: 'A caminho' },
    { id: 9, produto: 'Camiseta', tamanho: 'M', cor: 'Vermelho', quantidade: 4, preco: 'R$ 220,00', status: 'A caminho' },
    { id: 10, produto: 'Calça', tamanho: 'G', cor: 'Azul', quantidade: 4, preco: 'R$ 105,00', status: 'Em separação' },
    { id: 11, produto: 'Moletom', tamanho: 'P', cor: 'Preto', quantidade: 8, preco: 'R$ 200,00', status: 'Esperando Pagamento' },
    { id: 12, produto: 'Vestido', tamanho: 'M', cor: 'Verde', quantidade: 3, preco: 'R$ 160,00', status: 'A caminho' },
    { id: 13, produto: 'Camiseta', tamanho: 'M', cor: 'Vermelho', quantidade: 4, preco: 'R$ 220,00', status: 'A caminho' },
    { id: 14, produto: 'Calça', tamanho: 'G', cor: 'Azul', quantidade: 4, preco: 'R$ 105,00', status: 'Em separação' },
    { id: 15, produto: 'Moletom', tamanho: 'P', cor: 'Preto', quantidade: 8, preco: 'R$ 200,00', status: 'Esperando Pagamento' },
    { id: 16, produto: 'Vestido', tamanho: 'M', cor: 'Verde', quantidade: 3, preco: 'R$ 160,00', status: 'A caminho' },
  ];

  constructor() { }

  ngOnInit(): void {}

  get totalPreco(): number {
    return this.sales.reduce((acc, sale) => {
      // Ignora vendas com status "Esperando Pagamento"
      if (sale.status.trim().toLowerCase() === 'esperando pagamento') {
        return acc;
      }
      // Converte o preço para número corretamente
      const valorUnitario = parseFloat(
        sale.preco.replace('R$', '').replace(/\./g, '').replace(',', '.').trim()
      );
      if (isNaN(valorUnitario)) return acc;
      return acc + (valorUnitario * sale.quantidade);
    }, 0);
  }
}
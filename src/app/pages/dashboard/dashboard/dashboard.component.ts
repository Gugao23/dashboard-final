import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CardSummaryComponent } from '../card-summary/card-summary.component';
import { SalesTableDashboardComponent } from '../sales-table-dashboard/sales-table-dashboard.component';
import { SalesChartComponent } from '../sales-chart/sales-chart.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboarde',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    CardSummaryComponent,
    SalesTableDashboardComponent,
    SalesChartComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  // Total de produtos em estoque (soma das quantidades de todos os produtos)
  totalProdutosEstoque: number = 0;

  // Total de vendas (quantidade de clientes únicos na tabela de vendas)
  totalVendas: number = 0;

  // Referência para o componente da tabela de vendas
  @ViewChild('salesTable') salesTable!: SalesTableDashboardComponent;

  constructor(private http: HttpClient) { }

  // Ao iniciar o componente, carrega o total de produtos em estoque
  ngOnInit(): void {
    this.carregarTotalProdutos();
  }

  // Após a view ser inicializada, atualiza o total de vendas
  ngAfterViewInit(): void {
    // Pequeno delay para garantir que a tabela já carregou os dados
    setTimeout(() => this.atualizarTotalVendas(), 500);
  }

  // Busca todos os produtos do estoque e soma as quantidades
  carregarTotalProdutos() {
    this.http.get<any[]>('http://localhost:3000/produtosEstoque').subscribe(produtos => {
      // Soma todas as quantidades dos produtos
      this.totalProdutosEstoque = produtos.reduce((soma, item) => soma + (item.quantidade || 0), 0);
    });
  }

  // Conta quantos clientes únicos existem na lista de vendas
  atualizarTotalVendas() {
    if (this.salesTable && this.salesTable.sales) {
      // Extrai o nome do cliente de cada venda (campo "status" é o nome do usuário)
      const nomes = this.salesTable.sales.map(sale => sale.status?.trim()).filter(Boolean);
      // Cria um Set para garantir unicidade e conta o tamanho
      this.totalVendas = Array.from(new Set(nomes)).length;
    }
  }
}
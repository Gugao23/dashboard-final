import { Component, OnInit, ViewChild } from '@angular/core';
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
export class DashboardComponent implements OnInit {
  totalProdutosEstoque: number = 0;
  totalVendas: number = 0;

  @ViewChild('salesTable') salesTable!: SalesTableDashboardComponent;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.carregarTotalProdutos();
  }

  ngAfterViewInit(): void {
    // Aguarda a tabela carregar e atualiza o total de vendas
    setTimeout(() => this.atualizarTotalVendas(), 500);
  }

  carregarTotalProdutos() {
    this.http.get<any[]>('http://localhost:3000/produtosEstoque').subscribe(produtos => {
      this.totalProdutosEstoque = produtos.reduce((soma, item) => soma + (item.quantidade || 0), 0);
    });
  }

  atualizarTotalVendas() {
    if (this.salesTable && this.salesTable.sales) {
      // Extrai os nomes dos clientes (campo "status" na tabela de vendas)
      const nomes = this.salesTable.sales.map(sale => sale.status?.trim()).filter(Boolean);
      // Conta nomes únicos
      this.totalVendas = Array.from(new Set(nomes)).length;
    }
  }
}


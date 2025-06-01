import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // ✅ importar aqui
import { SalesService, SaleItem } from '../../../services/sales';

@Component({
  selector: 'app-sales-table-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // ✅ adicionar aqui
  providers: [SalesService], // ✅ manter o SalesService aqui
  templateUrl: './sales-table-dashboard.component.html',
  styleUrls: ['./sales-table-dashboard.component.css']
})
export class SalesTableDashboardComponent implements OnInit {
  sales: SaleItem[] = [];

  constructor(private salesService: SalesService) {}

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales(): void {
    this.salesService.getSalesItems().subscribe({
      next: (sales: SaleItem[]) => {
        this.sales = sales;
      },
      error: (err: any) => {
        console.error('Erro ao carregar vendas:', err);
        this.sales = [];
      }
    });
  }

  get totalPreco(): number {
    return this.sales.reduce((acc, sale) => {
      if (sale.status.trim().toLowerCase() === 'esperando pagamento') {
        return acc;
      }
      const valorUnitario = parseFloat(
        sale.preco.replace('R$', '').replace(/\./g, '').replace(',', '.').trim()
      );
      if (isNaN(valorUnitario)) return acc;
      return acc + (valorUnitario * sale.quantidade);
    }, 0);
  }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SalesService, SaleItem } from '../../../services/sales';

@Component({
  selector: 'app-sales-table-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Importa módulos necessários
  providers: [SalesService], // Usa o serviço de vendas
  templateUrl: './sales-table-dashboard.component.html',
  styleUrls: ['./sales-table-dashboard.component.css']
})
export class SalesTableDashboardComponent implements OnInit {
  // Lista de vendas carregadas do backend
  sales: SaleItem[] = [];

  // Evento emitido quando as vendas são carregadas
  @Output() vendasCarregadas = new EventEmitter<void>();

  constructor(private salesService: SalesService) {}

  // Ao iniciar, carrega as vendas
  ngOnInit(): void {
    this.loadSales();
  }

  // Busca as vendas do backend usando o serviço
  loadSales(): void {
    this.salesService.getSalesItems().subscribe({
      next: (sales: SaleItem[]) => {
        this.sales = sales;
        this.vendasCarregadas.emit(); // Emite o evento após carregar
      },
      error: (err: any) => {
        console.error('Erro ao carregar vendas:', err);
        this.sales = [];
        this.vendasCarregadas.emit(); // Emite mesmo com erro para atualizar
      }
    });
  }

// Calcula o valor total das vendas (exceto as que estão "esperando pagamento")
  get totalPreco(): number {
    const total = this.sales.reduce((acc, sale) => {
      if (sale.status.trim().toLowerCase() === 'esperando pagamento') {
        return acc;
      }

      // Converte o preço para número
      const valorUnitario = parseFloat(
        sale.preco.replace('R$', '').replace(/\./g, '').replace(',', '.').trim()
      );

      if (isNaN(valorUnitario)) return acc;

      return acc + (valorUnitario * sale.quantidade);
    }, 0);

    // Garante duas casas decimais, mesmo que sejam .00
    return parseFloat(total.toFixed(2));
  }

}

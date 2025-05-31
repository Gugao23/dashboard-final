import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface ProdutoVendido {
  nome: string;
  quantidade: number;
  valor: number;
}

@Component({
  selector: 'app-sales-chart',
  templateUrl: './sales-chart.component.html',
  styleUrls: ['./sales-chart.component.css']
})
export class SalesChartComponent implements OnInit {
  periodoAtivo: 'dia' | 'semana' | 'mes' = 'mes';
  produtosVendidos: ProdutoVendido[] = [];
  totalProdutos: number = 0;
  totalFaturado: number = 0;
  chart: any;

  // Dados fictícios de vendas
  private dadosVendas = {
    mes: [
      { nome: 'Camiseta', quantidade: 42, valor: 9240.00 },
      { nome: 'Calça', quantidade: 35, valor: 3675.00 },
      { nome: 'Moletom', quantidade: 28, valor: 5600.00 },
      { nome: 'Vestido', quantidade: 23, valor: 3680.00 },
      { nome: 'Jaqueta', quantidade: 18, valor: 5400.00 }
    ],
    semana: [
      { nome: 'Camiseta', quantidade: 12, valor: 2640.00 },
      { nome: 'Calça', quantidade: 8, valor: 840.00 },
      { nome: 'Moletom', quantidade: 7, valor: 1400.00 },
      { nome: 'Vestido', quantidade: 5, valor: 800.00 },
      { nome: 'Jaqueta', quantidade: 4, valor: 1200.00 }
    ],
    dia: [
      { nome: 'Camiseta', quantidade: 4, valor: 880.00 },
      { nome: 'Calça', quantidade: 4, valor: 420.00 },
      { nome: 'Moletom', quantidade: 2, valor: 400.00 },
      { nome: 'Vestido', quantidade: 1, valor: 160.00 },
      { nome: 'Jaqueta', quantidade: 1, valor: 300.00 }
    ]
  };

  ngOnInit(): void {
    this.carregarDados();
  }

  mudarPeriodo(periodo: 'dia' | 'semana' | 'mes'): void {
    this.periodoAtivo = periodo;
    this.carregarDados();
  }

  carregarDados(): void {
    this.produtosVendidos = this.dadosVendas[this.periodoAtivo];
    
    // Calcular totais
    this.totalProdutos = this.produtosVendidos.reduce((sum, item) => sum + item.quantidade, 0);
    this.totalFaturado = this.produtosVendidos.reduce((sum, item) => sum + item.valor, 0);
    
    // Atualizar gráfico
    this.atualizarGrafico();
  }

  atualizarGrafico(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = document.getElementById('vendasChart') as HTMLCanvasElement;
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.produtosVendidos.map(p => p.nome),
          datasets: [
            {
              label: 'Valor (R$)',
              data: this.produtosVendidos.map(p => p.valor),
              backgroundColor: '#4CAF50',
              borderColor: '#3e8e41',
              borderWidth: 1
            },
            {
              label: 'Quantidade',
              data: this.produtosVendidos.map(p => p.quantidade),
              backgroundColor: '#2196F3',
              borderColor: '#0b7dda',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
}
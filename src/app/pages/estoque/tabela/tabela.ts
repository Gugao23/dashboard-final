import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './tabela.html',
  styleUrls: ['./tabela.scss']
})
export class TabelaComponent implements OnInit {
  produtos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.http.get<any[]>('http://localhost:3000/produtosEstoque').subscribe(data => {
      this.produtos = data;
    });
  }
}
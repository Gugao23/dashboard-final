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
  // Array que irá armazenar todos os produtos do estoque
  produtos: any[] = [];

  // Injeta o serviço HttpClient para fazer requisições HTTP
  constructor(private http: HttpClient) {}

  // Ao iniciar o componente, carrega os produtos do estoque
  ngOnInit() {
    this.carregarProdutos();
  }

  // Busca todos os produtos do endpoint e armazena no array produtos
  carregarProdutos() {
    this.http.get<any[]>('http://localhost:3000/produtosEstoque').subscribe(data => {
      this.produtos = data;
    });
  }
}
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-addform',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './addform.html',
  styleUrls: ['./addform.scss']
})
export class AddformComponent {
  produto = '';
  categoria = '';
  tamanho = '';
  quantidade: number | null = null;
  preco: number | null = null;

  produtosInfo: any = {
    'CamisetaBasic': { categoria: 'Camiseta', preco: 119.99 },
    'CalçaVermelha': { categoria: 'Calça', preco: 139.99 },
    'CamisetaSwag': { categoria: 'Camiseta', preco: 119.99 },
    'MoletomOff': { categoria: 'Moletom', preco: 129.99 },
    'MoletomVermelho': { categoria: 'Moletom', preco: 149.99 },
    'MoletomPurpleJack': { categoria: 'Moletom', preco: 139.99 }
  };

  @Output() produtoAdicionado = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  onProdutoChange() {
    const info = this.produtosInfo[this.produto];
    if (info) {
      this.categoria = info.categoria;
      this.preco = info.preco;
    } else {
      this.categoria = '';
      this.preco = null;
    }
  }

  onSubmit() {
    this.http.get<any[]>('http://localhost:3000/produtosEstoque').subscribe(produtos => {
      // Busca produto pelo nome E tamanho
      const existente = produtos.find(
        p => p.produto === this.produto && p.tamanho === this.tamanho
      );
      if (existente) {
        // Atualiza a quantidade do produto existente
        const novaQuantidade = (existente.quantidade || 0) + (this.quantidade || 0);
        this.http.patch(`http://localhost:3000/produtosEstoque/${existente.id}`, {
          quantidade: novaQuantidade
        }).subscribe(() => {
          this.produto = '';
          this.categoria = '';
          this.tamanho = '';
          this.quantidade = null;
          this.preco = null;
          this.produtoAdicionado.emit();
        });
      } else {
        // Gera novo id incremental, garantindo que não há duplicidade
        const ids = produtos.map(p => typeof p.id === 'number' ? p.id : parseInt(p.id, 10)).filter(id => !isNaN(id));
        const novoId = ids.length > 0 ? Math.max(...ids) + 1 : 1;

        const novoProduto = {
          id: novoId,
          produto: this.produto,
          categoria: this.categoria,
          tamanho: this.tamanho,
          quantidade: this.quantidade,
          preco: this.preco
        };

        this.http.post('http://localhost:3000/produtosEstoque', novoProduto).subscribe(() => {
          this.produto = '';
          this.categoria = '';
          this.tamanho = '';
          this.quantidade = null;
          this.preco = null;
          this.produtoAdicionado.emit();
        });
      }
    });
  }
}
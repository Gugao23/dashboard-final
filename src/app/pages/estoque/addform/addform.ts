import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addform',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
}
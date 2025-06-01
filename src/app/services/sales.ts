import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface CompraItem {
  produtoId: string;
  nomeProduto: string;
  categoria: string;
  preco: number;
  quantidade: number;
  tamanho: string;
  cor: string;
  total: number;
}

interface Compra {
  id: string;
  userId: string;
  nomeUsuario: string;
  dataCompra: string;
  itens: CompraItem[];
  subtotal: number;
  valorTotal: number;
  status: string;
}

export interface SaleItem {
  id: string;
  produto: string;
  tamanho: string;
  cor: string;
  quantidade: number;
  preco: string;
  status: string;
}

@Injectable({
  providedIn: 'root', // ✅ Aqui está a correção
})
export class SalesService {
  private apiUrl = 'http://localhost:3000/compras';

  constructor(private http: HttpClient) {}

  getSalesItems(): Observable<SaleItem[]> {
    return this.http.get<Compra[]>(this.apiUrl).pipe(
      map(compras => {
        const salesItems: SaleItem[] = [];

        compras.forEach(compra => {
          compra.itens.forEach(item => {
            salesItems.push({
              id: `${compra.id}-${item.produtoId}`,
              produto: item.nomeProduto,
              tamanho: item.tamanho || 'N/A',
              cor: item.cor || 'N/A',
              quantidade: item.quantidade,
              preco: `R$ ${item.preco.toFixed(2).replace('.', ',')}`,
              status: compra.nomeUsuario
            });
          });
        });

        return salesItems;
      })
    );
  }
}

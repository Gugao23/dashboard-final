import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Client {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  estado: string;
}

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.css']
})
export class ClientTableComponent implements OnChanges {
  @Input() filterCriteria: { nome?: string; cidade?: string; estado?: string } = {};

  allClients: Client[] = [
    { id: 1, nome: 'João Silva', email: 'joaosilva@gmail.com', telefone: '(11) 92100-1234', cidade: 'São Paulo', estado: 'SP' },
  { id: 2, nome: 'Anna Paula', email: 'anapau@gmail.com', telefone: '(21) 92904-5848', cidade: 'Rio de Janeiro', estado: 'RJ' },
  { id: 3, nome: 'João Pedro', email: 'jotape@gmail.com', telefone: '(68) 95505-0580', cidade: 'Rio Branco', estado: 'AC' },
  { id: 4, nome: 'Pedro Henrique', email: 'ph123433@gmail.com', telefone: '(11) 91456-7131', cidade: 'São Paulo', estado: 'SP' },
  { id: 5, nome: 'Maria Oliveira', email: 'maria.o@gmail.com', telefone: '(31) 98877-6655', cidade: 'Belo Horizonte', estado: 'MG' },
  { id: 6, nome: 'Carlos Souza', email: 'carlos.souza@outlook.com', telefone: '(41) 97766-5544', cidade: 'Curitiba', estado: 'PR' },
  { id: 7, nome: 'Fernanda Lima', email: 'fernanda.lima@yahoo.com', telefone: '(51) 96655-4433', cidade: 'Porto Alegre', estado: 'RS' },
  { id: 8, nome: 'Paula Lima', email: 'paulalima@gmail.com', telefone: '(11) 92100-1234', cidade: 'São Paulo', estado: 'SP' },
  { id: 9, nome: 'Karla Torres', email: 'karlatrr@gmail.com', telefone: '(21) 92904-5848', cidade: 'Rio de Janeiro', estado: 'RJ' },
  { id: 10, nome: 'Matheus Pereira', email: 'mathpereira@gmail.com', telefone: '(68) 92225-0580', cidade: 'Rio Branco', estado: 'AC' },
  { id: 11, nome: 'Henrique Vaz', email: 'Henriquevaz@gmail.com', telefone: '(11) 91103-2331', cidade: 'São Paulo', estado: 'SP' },
  { id: 12, nome: 'Olivia Lemes', email: 'olemes@gmail.com', telefone: '(31) 98837-5555', cidade: 'Belo Horizonte', estado: 'MG' },
  { id: 13, nome: 'Karen Moreira', email: 'moreiraka@outlook.com', telefone: '(11) 94766-1224', cidade: 'São Paulo', estado: 'SP' },
  { id: 14, nome: 'Felipe Melo', email: 'felipeml@yahoo.com', telefone: '(11) 97670-4433', cidade: 'São Paulo', estado: 'SP' },
  { id: 15, nome: 'Lucas Martins', email: 'lucasmartins@gmail.com', telefone: '(21) 98888-1234', cidade: 'Niterói', estado: 'RJ' },
  { id: 16, nome: 'Bruna Costa', email: 'brunacosta@gmail.com', telefone: '(31) 98765-4321', cidade: 'Belo Horizonte', estado: 'MG' },
  { id: 17, nome: 'Ricardo Alves', email: 'ricardoalves@gmail.com', telefone: '(41) 91234-5678', cidade: 'Curitiba', estado: 'PR' },
  { id: 18, nome: 'Juliana Souza', email: 'julianasouza@gmail.com', telefone: '(51) 93456-7890', cidade: 'Porto Alegre', estado: 'RS' },
  { id: 19, nome: 'Gabriel Rocha', email: 'gabrielrocha@gmail.com', telefone: '(68) 90000-1111', cidade: 'Rio Branco', estado: 'AC' },
  { id: 20, nome: 'Patrícia Mendes', email: 'patriciamendes@gmail.com', telefone: '(11) 95555-6666', cidade: 'São Paulo', estado: 'SP' }
  ];

  filteredClients: Client[] = [];

  constructor() {
    this.filteredClients = this.allClients;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.applyFilters();
  }

  applyFilters(): void {
    const nomeFiltro = (this.filterCriteria.nome || '').toLowerCase();
    const cidadeFiltro = (this.filterCriteria.cidade || '').toLowerCase();
    const estadoFiltro = (this.filterCriteria.estado || '').toUpperCase();

    this.filteredClients = this.allClients.filter(client => {
      const matchNome = !nomeFiltro || client.nome.toLowerCase().includes(nomeFiltro);
      const matchCidade = !cidadeFiltro || client.cidade.toLowerCase().includes(cidadeFiltro);
      const matchEstado = !estadoFiltro || client.estado.toUpperCase() === estadoFiltro;
      return matchNome && matchCidade && matchEstado;
    });
  }

  getUniqueStates(): string[] {
    const states = this.allClients.map(client => client.estado);
    return Array.from(new Set(states)).sort();
  }
}
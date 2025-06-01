import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

export interface Client {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  rua: string;
  numero: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
}

export interface DadosPessoais {
  id: string;
  userId: string;
  nome: string;
  cpf: string;
  telefone: string;
  dataNascimento: string;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
}

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.css']
})
export class ClientTableComponent implements OnInit, OnChanges {
  @Input() filterCriteria: { nome?: string; email?: string } = {};

  private apiUrl = 'http://localhost:3000'; // Ajuste a URL conforme necessário

  allClients: Client[] = [];
  filteredClients: Client[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadClients();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.applyFilters();
  }

  async loadClients(): Promise<void> {
    try {
      // Buscar usuários e dados pessoais
      const users = await this.http.get<User[]>(`${this.apiUrl}/users`).toPromise();
      const dadosPessoais = await this.http.get<DadosPessoais[]>(`${this.apiUrl}/dadosPessoais`).toPromise();

      // Combinar os dados
      this.allClients = this.combineUserData(users || [], dadosPessoais || []);
      this.filteredClients = [...this.allClients];
      this.applyFilters();

    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
      // Em caso de erro, manter array vazio
      this.allClients = [];
      this.filteredClients = [];
    }
  }

  private combineUserData(users: User[], dadosPessoais: DadosPessoais[]): Client[] {
    return dadosPessoais.map((dados, index) => {
      const user = users.find(u => u.id === dados.userId);
      return {
        id: index + 1, // Manter ID numérico sequencial como no original
        nome: dados.nome,
        email: user?.email || '',
        telefone: dados.telefone,
        rua: dados.rua,
        numero: dados.numero
      };
    });
  }

  applyFilters(): void {
    const nomeFiltro = (this.filterCriteria.nome || '').toLowerCase();
    const emailFiltro = (this.filterCriteria.email || '').toLowerCase();

    this.filteredClients = this.allClients.filter(client => {
      const matchNome = !nomeFiltro || client.nome.toLowerCase().includes(nomeFiltro);
      const matchEmail = !emailFiltro || client.email.toLowerCase().includes(emailFiltro);
      return matchNome && matchEmail;
    });
  }

  getUniqueRuas(): string[] {
    const ruas = this.allClients.map(client => client.rua);
    return Array.from(new Set(ruas)).sort();
  }
}

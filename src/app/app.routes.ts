import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard'
import { Estoque } from './pages/estoque/estoque';
import { ClientesComponent } from './pages/clientes/clientes';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'estoque', component: Estoque },
  { path: 'clientes', component: ClientesComponent },
];
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  template:
  `
    <app-sidebar></app-sidebar>
    <main>
      <router-outlet></router-outlet>
    </main>
  `, 
   
  
})
export class App{}


import { Component } from '@angular/core';
import { CardSummaryComponent } from "./card-summary/card-summary.component";
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from "../../layout/sidebar/sidebar";
import { DashboardComponent } from "./dashboard/dashboard.component";
@Component({
  selector: 'app-dashboard',
  imports: [CardSummaryComponent, HeaderComponent, SidebarComponent, DashboardComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

}

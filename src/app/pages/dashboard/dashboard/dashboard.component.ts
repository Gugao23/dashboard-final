import { Component, OnInit } from '@angular/core';
import { CardSummaryComponent } from '../card-summary/card-summary.component';
import { SalesTableDashboardComponent } from '../sales-table-dashboard/sales-table-dashboard.component';
import { SalesChartComponent } from '../sales-chart/sales-chart.component';
import { CommonModule } from '@angular/common'; // Necessário para *ngFor, *ngIf, etc., se usados diretamente no template do DashboardComponent

@Component({
  selector: 'app-dashboarde',
  standalone: true,
  imports: [
    CommonModule,
    CardSummaryComponent,
    SalesTableDashboardComponent,
    SalesChartComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}


import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTableDashboardComponent } from './sales-table-dashboard.component';

describe('SalesTableDashboardComponent', () => {
  let component: SalesTableDashboardComponent;
  let fixture: ComponentFixture<SalesTableDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesTableDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesTableDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

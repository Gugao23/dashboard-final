import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadereComponent } from './header.component';

describe('HeadereComponent', () => {
  let component: HeadereComponent;
  let fixture: ComponentFixture<HeadereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadereComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

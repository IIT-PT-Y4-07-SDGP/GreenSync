import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrcDriverDashboardComponent } from './prc-driver-dashboard.component';

describe('PrcDriverDashboardComponent', () => {
  let component: PrcDriverDashboardComponent;
  let fixture: ComponentFixture<PrcDriverDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrcDriverDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrcDriverDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

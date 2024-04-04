import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrcDriverPriceChartComponent } from './prc-driver-price-chart.component';

describe('PrcDriverPriceChartComponent', () => {
  let component: PrcDriverPriceChartComponent;
  let fixture: ComponentFixture<PrcDriverPriceChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrcDriverPriceChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrcDriverPriceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

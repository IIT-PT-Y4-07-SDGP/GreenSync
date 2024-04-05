import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrcDriverPickupViewPageComponent } from './prc-driver-pickup-view-page.component';

describe('PrcDriverPickupViewPageComponent', () => {
  let component: PrcDriverPickupViewPageComponent;
  let fixture: ComponentFixture<PrcDriverPickupViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrcDriverPickupViewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrcDriverPickupViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

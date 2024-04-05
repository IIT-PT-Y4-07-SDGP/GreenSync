import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrcDriverPickupConfirmPageComponent } from './prc-driver-pickup-confirm-page.component';

describe('PrcDriverPickupConfirmPageComponent', () => {
  let component: PrcDriverPickupConfirmPageComponent;
  let fixture: ComponentFixture<PrcDriverPickupConfirmPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrcDriverPickupConfirmPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrcDriverPickupConfirmPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

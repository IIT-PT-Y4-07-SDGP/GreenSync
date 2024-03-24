import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrcDriverPickupHitoryPageComponent } from './prc-driver-pickup-hitory-page.component';

describe('PrcDriverPickupHitoryPageComponent', () => {
  let component: PrcDriverPickupHitoryPageComponent;
  let fixture: ComponentFixture<PrcDriverPickupHitoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrcDriverPickupHitoryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrcDriverPickupHitoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

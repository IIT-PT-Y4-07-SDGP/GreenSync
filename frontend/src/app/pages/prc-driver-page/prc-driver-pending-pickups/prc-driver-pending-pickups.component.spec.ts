import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrcDriverPendingPickupsComponent } from './prc-driver-pending-pickups.component';

describe('PrcDriverPendingPickupsComponent', () => {
  let component: PrcDriverPendingPickupsComponent;
  let fixture: ComponentFixture<PrcDriverPendingPickupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrcDriverPendingPickupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrcDriverPendingPickupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

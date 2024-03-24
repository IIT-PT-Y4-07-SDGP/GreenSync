import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupsListComponent } from './pickups-list.component';

describe('PickupsListComponent', () => {
  let component: PickupsListComponent;
  let fixture: ComponentFixture<PickupsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickupsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDrivesListComponent } from './view-drives-list.component';

describe('ViewDrivesListComponent', () => {
  let component: ViewDrivesListComponent;
  let fixture: ComponentFixture<ViewDrivesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDrivesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDrivesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

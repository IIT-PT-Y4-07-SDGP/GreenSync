import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPrcListComponent } from './view-prc-list.component';

describe('ViewPrcListComponent', () => {
  let component: ViewPrcListComponent;
  let fixture: ComponentFixture<ViewPrcListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPrcListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPrcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

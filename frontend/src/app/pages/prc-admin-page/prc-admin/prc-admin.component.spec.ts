import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrcAdminComponent } from './prc-admin.component';

describe('PrcAdminComponent', () => {
  let component: PrcAdminComponent;
  let fixture: ComponentFixture<PrcAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrcAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrcAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

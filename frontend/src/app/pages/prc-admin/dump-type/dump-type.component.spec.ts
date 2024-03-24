import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DumpTypeComponent } from './dump-type.component';

describe('DumpTypeComponent', () => {
  let component: DumpTypeComponent;
  let fixture: ComponentFixture<DumpTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DumpTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DumpTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

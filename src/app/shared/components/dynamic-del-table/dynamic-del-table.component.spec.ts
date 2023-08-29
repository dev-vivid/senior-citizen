import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDelTableComponent } from './dynamic-del-table.component';

describe('DynamicDelTableComponent', () => {
  let component: DynamicDelTableComponent;
  let fixture: ComponentFixture<DynamicDelTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicDelTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicDelTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

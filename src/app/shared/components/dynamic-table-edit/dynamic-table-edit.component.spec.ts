import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTableEditComponent } from './dynamic-table-edit.component';

describe('DynamicTableEditComponent', () => {
  let component: DynamicTableEditComponent;
  let fixture: ComponentFixture<DynamicTableEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicTableEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicTableEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

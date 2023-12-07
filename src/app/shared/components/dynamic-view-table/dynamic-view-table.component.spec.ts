import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicViewTableComponent } from './dynamic-view-table.component';

describe('DynamicViewTableComponent', () => {
  let component: DynamicViewTableComponent;
  let fixture: ComponentFixture<DynamicViewTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicViewTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

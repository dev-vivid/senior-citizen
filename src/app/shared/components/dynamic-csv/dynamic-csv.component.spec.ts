import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCsvComponent } from './dynamic-csv.component';

describe('DynamicCsvComponent', () => {
  let component: DynamicCsvComponent;
  let fixture: ComponentFixture<DynamicCsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicCsvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalTypeListComponent } from './medical-type-list.component';

describe('MedicalTypeListComponent', () => {
  let component: MedicalTypeListComponent;
  let fixture: ComponentFixture<MedicalTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalTypeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

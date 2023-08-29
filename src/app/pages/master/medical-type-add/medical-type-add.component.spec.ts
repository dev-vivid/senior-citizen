import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalTypeAddComponent } from './medical-type-add.component';

describe('MedicalTypeAddComponent', () => {
  let component: MedicalTypeAddComponent;
  let fixture: ComponentFixture<MedicalTypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalTypeAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

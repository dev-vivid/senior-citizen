import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerAddComponent } from './officer-add.component';

describe('OfficerAddComponent', () => {
  let component: OfficerAddComponent;
  let fixture: ComponentFixture<OfficerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficerAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerTypeAddComponent } from './officer-type-add.component';

describe('OfficerTypeAddComponent', () => {
  let component: OfficerTypeAddComponent;
  let fixture: ComponentFixture<OfficerTypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficerTypeAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficerTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

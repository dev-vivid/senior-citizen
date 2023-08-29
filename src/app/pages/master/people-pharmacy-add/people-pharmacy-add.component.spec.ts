import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeoplePharmacyAddComponent } from './people-pharmacy-add.component';

describe('PeoplePharmacyAddComponent', () => {
  let component: PeoplePharmacyAddComponent;
  let fixture: ComponentFixture<PeoplePharmacyAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeoplePharmacyAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeoplePharmacyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

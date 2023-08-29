import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeoplePharmacyComponent } from './people-pharmacy.component';

describe('PeoplePharmacyComponent', () => {
  let component: PeoplePharmacyComponent;
  let fixture: ComponentFixture<PeoplePharmacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeoplePharmacyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeoplePharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerTypeListComponent } from './officer-type-list.component';

describe('OfficerTypeListComponent', () => {
  let component: OfficerTypeListComponent;
  let fixture: ComponentFixture<OfficerTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficerTypeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficerTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

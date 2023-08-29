import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldAgeTypeListComponent } from './old-age-type-list.component';

describe('OldAgeTypeListComponent', () => {
  let component: OldAgeTypeListComponent;
  let fixture: ComponentFixture<OldAgeTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldAgeTypeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldAgeTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldAgeListComponent } from './old-age-list.component';

describe('OldAgeListComponent', () => {
  let component: OldAgeListComponent;
  let fixture: ComponentFixture<OldAgeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldAgeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldAgeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

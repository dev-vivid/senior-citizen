import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldAgeTypeAddComponent } from './old-age-type-add.component';

describe('OldAgeTypeAddComponent', () => {
  let component: OldAgeTypeAddComponent;
  let fixture: ComponentFixture<OldAgeTypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldAgeTypeAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldAgeTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

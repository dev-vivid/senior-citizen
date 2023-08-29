import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldAgeAddComponent } from './old-age-add.component';

describe('OldAgeAddComponent', () => {
  let component: OldAgeAddComponent;
  let fixture: ComponentFixture<OldAgeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldAgeAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldAgeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

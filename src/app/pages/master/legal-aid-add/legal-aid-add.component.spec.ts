import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalAidAddComponent } from './legal-aid-add.component';

describe('LegalAidAddComponent', () => {
  let component: LegalAidAddComponent;
  let fixture: ComponentFixture<LegalAidAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalAidAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalAidAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

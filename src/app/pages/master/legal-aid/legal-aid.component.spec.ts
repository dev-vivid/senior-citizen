import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalAidComponent } from './legal-aid.component';

describe('LegalAidComponent', () => {
  let component: LegalAidComponent;
  let fixture: ComponentFixture<LegalAidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalAidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalAidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrivanceFormComponent } from './grivance-form.component';

describe('GrivanceFormComponent', () => {
  let component: GrivanceFormComponent;
  let fixture: ComponentFixture<GrivanceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrivanceFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrivanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

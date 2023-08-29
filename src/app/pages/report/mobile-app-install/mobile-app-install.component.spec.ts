import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAppInstallComponent } from './mobile-app-install.component';

describe('MobileAppInstallComponent', () => {
  let component: MobileAppInstallComponent;
  let fixture: ComponentFixture<MobileAppInstallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileAppInstallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileAppInstallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginOtpHomePage } from './login-otp-home.page';

describe('LoginOtpHomePage', () => {
  let component: LoginOtpHomePage;
  let fixture: ComponentFixture<LoginOtpHomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginOtpHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

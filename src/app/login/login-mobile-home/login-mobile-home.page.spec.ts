import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginMobileHomePage } from './login-mobile-home.page';

describe('LoginMobileHomePage', () => {
  let component: LoginMobileHomePage;
  let fixture: ComponentFixture<LoginMobileHomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginMobileHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

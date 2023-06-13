import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentsSettlementsPage } from './payments-settlements.page';

describe('PaymentsSettlementsPage', () => {
  let component: PaymentsSettlementsPage;
  let fixture: ComponentFixture<PaymentsSettlementsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaymentsSettlementsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

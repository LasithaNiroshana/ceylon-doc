import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectDoctorPage } from './select-doctor.page';

describe('SelectDoctorPage', () => {
  let component: SelectDoctorPage;
  let fixture: ComponentFixture<SelectDoctorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SelectDoctorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

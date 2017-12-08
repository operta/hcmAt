import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtApplicantWrapperComponent } from './at-applicant-wrapper.component';

describe('AtApplicantWrapperComponent', () => {
  let component: AtApplicantWrapperComponent;
  let fixture: ComponentFixture<AtApplicantWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtApplicantWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtApplicantWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

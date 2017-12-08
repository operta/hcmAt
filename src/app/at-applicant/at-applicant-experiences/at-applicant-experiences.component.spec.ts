import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtApplicantExperiencesComponent } from './at-applicant-experiences.component';

describe('AtApplicantExperiencesComponent', () => {
  let component: AtApplicantExperiencesComponent;
  let fixture: ComponentFixture<AtApplicantExperiencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtApplicantExperiencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtApplicantExperiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

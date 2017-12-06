import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtApplicantExperiencesAddComponent } from './at-applicant-experiences-add.component';

describe('AtApplicantExperiencesAddComponent', () => {
  let component: AtApplicantExperiencesAddComponent;
  let fixture: ComponentFixture<AtApplicantExperiencesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtApplicantExperiencesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtApplicantExperiencesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

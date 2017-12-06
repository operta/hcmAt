import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtApplicantExperiencesListComponent } from './at-applicant-experiences-list.component';

describe('AtApplicantExperiencesListComponent', () => {
  let component: AtApplicantExperiencesListComponent;
  let fixture: ComponentFixture<AtApplicantExperiencesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtApplicantExperiencesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtApplicantExperiencesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

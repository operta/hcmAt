import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtApplicantSchoolsListComponent } from './at-applicant-schools-list.component';

describe('AtApplicantSchoolsListComponent', () => {
  let component: AtApplicantSchoolsListComponent;
  let fixture: ComponentFixture<AtApplicantSchoolsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtApplicantSchoolsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtApplicantSchoolsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

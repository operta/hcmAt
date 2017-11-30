import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtApplicantSchoolsItemComponent } from './at-applicant-schools-item.component';

describe('AtApplicantSchoolsItemComponent', () => {
  let component: AtApplicantSchoolsItemComponent;
  let fixture: ComponentFixture<AtApplicantSchoolsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtApplicantSchoolsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtApplicantSchoolsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtApplicantSkillsListComponent } from './at-applicant-skills-list.component';

describe('AtApplicantSkillsListComponent', () => {
  let component: AtApplicantSkillsListComponent;
  let fixture: ComponentFixture<AtApplicantSkillsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtApplicantSkillsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtApplicantSkillsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

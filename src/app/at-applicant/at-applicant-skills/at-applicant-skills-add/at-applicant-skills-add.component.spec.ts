import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtApplicantSkillsAddComponent } from './at-applicant-skills-add.component';

describe('AtApplicantSkillsAddComponent', () => {
  let component: AtApplicantSkillsAddComponent;
  let fixture: ComponentFixture<AtApplicantSkillsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtApplicantSkillsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtApplicantSkillsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtApplicantSkillsComponent } from './at-applicant-skills.component';

describe('AtApplicantSkillsComponent', () => {
  let component: AtApplicantSkillsComponent;
  let fixture: ComponentFixture<AtApplicantSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtApplicantSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtApplicantSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

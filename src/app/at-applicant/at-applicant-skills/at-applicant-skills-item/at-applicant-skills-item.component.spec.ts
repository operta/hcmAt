import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtApplicantSkillsItemComponent } from './at-applicant-skills-item.component';

describe('AtApplicantSkillsItemComponent', () => {
  let component: AtApplicantSkillsItemComponent;
  let fixture: ComponentFixture<AtApplicantSkillsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtApplicantSkillsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtApplicantSkillsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

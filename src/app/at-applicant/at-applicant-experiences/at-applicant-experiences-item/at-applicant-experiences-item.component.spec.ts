import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtApplicantExperiencesItemComponent } from './at-applicant-experiences-item.component';

describe('AtApplicantExperiencesItemComponent', () => {
  let component: AtApplicantExperiencesItemComponent;
  let fixture: ComponentFixture<AtApplicantExperiencesItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtApplicantExperiencesItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtApplicantExperiencesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

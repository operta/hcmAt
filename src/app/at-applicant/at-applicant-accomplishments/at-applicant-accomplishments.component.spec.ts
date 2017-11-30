import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtApplicantAccomplishmentsComponent } from './at-applicant-accomplishments.component';

describe('AtApplicantAccomplishmentsComponent', () => {
  let component: AtApplicantAccomplishmentsComponent;
  let fixture: ComponentFixture<AtApplicantAccomplishmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtApplicantAccomplishmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtApplicantAccomplishmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

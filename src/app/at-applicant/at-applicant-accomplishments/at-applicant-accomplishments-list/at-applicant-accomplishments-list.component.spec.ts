import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtApplicantAccomplishmentsListComponent } from './at-applicant-accomplishments-list.component';

describe('AtApplicantAccomplishmentsListComponent', () => {
  let component: AtApplicantAccomplishmentsListComponent;
  let fixture: ComponentFixture<AtApplicantAccomplishmentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtApplicantAccomplishmentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtApplicantAccomplishmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

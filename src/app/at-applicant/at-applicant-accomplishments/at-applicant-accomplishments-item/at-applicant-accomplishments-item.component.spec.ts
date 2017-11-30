import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtApplicantAccomplishmentsItemComponent } from './at-applicant-accomplishments-item.component';

describe('AtApplicantAccomplishmentsItemComponent', () => {
  let component: AtApplicantAccomplishmentsItemComponent;
  let fixture: ComponentFixture<AtApplicantAccomplishmentsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtApplicantAccomplishmentsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtApplicantAccomplishmentsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

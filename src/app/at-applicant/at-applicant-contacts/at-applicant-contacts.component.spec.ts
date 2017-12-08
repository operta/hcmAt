import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtApplicantContactsComponent } from './at-applicant-contacts.component';

describe('AtApplicantContactsComponent', () => {
  let component: AtApplicantContactsComponent;
  let fixture: ComponentFixture<AtApplicantContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtApplicantContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtApplicantContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

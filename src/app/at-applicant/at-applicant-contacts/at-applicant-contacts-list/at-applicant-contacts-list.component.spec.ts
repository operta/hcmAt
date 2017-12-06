import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtApplicantContactsListComponent } from './at-applicant-contacts-list.component';

describe('AtApplicantContactsListComponent', () => {
  let component: AtApplicantContactsListComponent;
  let fixture: ComponentFixture<AtApplicantContactsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtApplicantContactsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtApplicantContactsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

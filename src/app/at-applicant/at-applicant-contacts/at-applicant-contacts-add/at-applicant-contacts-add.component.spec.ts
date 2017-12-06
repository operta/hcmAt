import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtApplicantContactsAddComponent } from './at-applicant-contacts-add.component';

describe('AtApplicantContactsAddComponent', () => {
  let component: AtApplicantContactsAddComponent;
  let fixture: ComponentFixture<AtApplicantContactsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtApplicantContactsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtApplicantContactsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

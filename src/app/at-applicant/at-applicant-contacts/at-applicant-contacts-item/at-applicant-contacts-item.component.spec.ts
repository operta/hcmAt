import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtApplicantContactsItemComponent } from './at-applicant-contacts-item.component';

describe('AtApplicantContactsItemComponent', () => {
  let component: AtApplicantContactsItemComponent;
  let fixture: ComponentFixture<AtApplicantContactsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtApplicantContactsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtApplicantContactsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

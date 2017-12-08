import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtApplicantDocumentsComponent } from './at-applicant-documents.component';

describe('AtApplicantDocumentsComponent', () => {
  let component: AtApplicantDocumentsComponent;
  let fixture: ComponentFixture<AtApplicantDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtApplicantDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtApplicantDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

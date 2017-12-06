import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtApplicantDocumentsListComponent } from './at-applicant-documents-list.component';

describe('AtApplicantDocumentsListComponent', () => {
  let component: AtApplicantDocumentsListComponent;
  let fixture: ComponentFixture<AtApplicantDocumentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtApplicantDocumentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtApplicantDocumentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

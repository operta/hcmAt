import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtApplicantDocumentsAddComponent } from './at-applicant-documents-add.component';

describe('AtApplicantDocumentsAddComponent', () => {
  let component: AtApplicantDocumentsAddComponent;
  let fixture: ComponentFixture<AtApplicantDocumentsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtApplicantDocumentsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtApplicantDocumentsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

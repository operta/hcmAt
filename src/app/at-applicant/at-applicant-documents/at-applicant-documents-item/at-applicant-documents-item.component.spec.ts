import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtApplicantDocumentsItemComponent } from './at-applicant-documents-item.component';

describe('AtApplicantDocumentsItemComponent', () => {
  let component: AtApplicantDocumentsItemComponent;
  let fixture: ComponentFixture<AtApplicantDocumentsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtApplicantDocumentsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtApplicantDocumentsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantOverviewComponent } from './applicant-overview.component';

describe('ApplicantOverviewComponent', () => {
  let component: ApplicantOverviewComponent;
  let fixture: ComponentFixture<ApplicantOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

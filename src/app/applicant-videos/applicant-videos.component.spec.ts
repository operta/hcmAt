import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantVideosComponent } from './applicant-videos.component';

describe('ApplicantVideosComponent', () => {
  let component: ApplicantVideosComponent;
  let fixture: ComponentFixture<ApplicantVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

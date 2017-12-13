import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtJobApplicationStatusesComponent } from './at-job-application-statuses.component';

describe('AtJobApplicationStatusesComponent', () => {
  let component: AtJobApplicationStatusesComponent;
  let fixture: ComponentFixture<AtJobApplicationStatusesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtJobApplicationStatusesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtJobApplicationStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

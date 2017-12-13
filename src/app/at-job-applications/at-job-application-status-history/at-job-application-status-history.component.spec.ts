import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtJobApplicationStatusHistoryComponent } from './at-job-application-status-history.component';

describe('AtJobApplicationStatusHistoryComponent', () => {
  let component: AtJobApplicationStatusHistoryComponent;
  let fixture: ComponentFixture<AtJobApplicationStatusHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtJobApplicationStatusHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtJobApplicationStatusHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

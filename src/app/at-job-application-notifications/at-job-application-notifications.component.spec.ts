import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtJobApplicationNotificationsComponent } from './at-job-application-notifications.component';

describe('AtJobApplicationNotificationsComponent', () => {
  let component: AtJobApplicationNotificationsComponent;
  let fixture: ComponentFixture<AtJobApplicationNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtJobApplicationNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtJobApplicationNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

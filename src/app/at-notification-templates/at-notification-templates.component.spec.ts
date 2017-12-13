import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtNotificationTemplatesComponent } from './at-notification-templates.component';

describe('AtNotificationTemplatesComponent', () => {
  let component: AtNotificationTemplatesComponent;
  let fixture: ComponentFixture<AtNotificationTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtNotificationTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtNotificationTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

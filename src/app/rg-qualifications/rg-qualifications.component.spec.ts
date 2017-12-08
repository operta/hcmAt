import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RgQualificationsComponent } from './rg-qualifications.component';

describe('RgQualificationsComponent', () => {
  let component: RgQualificationsComponent;
  let fixture: ComponentFixture<RgQualificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RgQualificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RgQualificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

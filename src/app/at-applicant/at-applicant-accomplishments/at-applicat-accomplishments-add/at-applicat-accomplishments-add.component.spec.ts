import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtApplicatAccomplishmentsAddComponent } from './at-applicat-accomplishments-add.component';

describe('AtApplicatAccomplishmentsAddComponent', () => {
  let component: AtApplicatAccomplishmentsAddComponent;
  let fixture: ComponentFixture<AtApplicatAccomplishmentsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtApplicatAccomplishmentsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtApplicatAccomplishmentsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

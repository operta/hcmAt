import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RgRegionsComponent } from './rg-regions.component';

describe('RgRegionsComponent', () => {
  let component: RgRegionsComponent;
  let fixture: ComponentFixture<RgRegionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RgRegionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RgRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

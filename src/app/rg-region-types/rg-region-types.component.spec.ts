import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RgRegionTypesComponent } from './rg-region-types.component';

describe('RgRegionTypesComponent', () => {
  let component: RgRegionTypesComponent;
  let fixture: ComponentFixture<RgRegionTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RgRegionTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RgRegionTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

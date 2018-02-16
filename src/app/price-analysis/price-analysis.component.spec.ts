import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceAnalysisComponent } from './price-analysis.component';

describe('PriceAnalysisComponent', () => {
  let component: PriceAnalysisComponent;
  let fixture: ComponentFixture<PriceAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

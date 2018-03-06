import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedPricesComponent } from './suggested-prices.component';

describe('SuggestedPricesComponent', () => {
  let component: SuggestedPricesComponent;
  let fixture: ComponentFixture<SuggestedPricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestedPricesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPricesComponent } from './edit-prices.component';

describe('EditPricesComponent', () => {
  let component: EditPricesComponent;
  let fixture: ComponentFixture<EditPricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPricesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

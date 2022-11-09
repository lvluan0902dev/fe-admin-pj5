import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBrandEditComponent } from './product-brand-edit.component';

describe('ProductBrandEditComponent', () => {
  let component: ProductBrandEditComponent;
  let fixture: ComponentFixture<ProductBrandEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductBrandEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductBrandEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

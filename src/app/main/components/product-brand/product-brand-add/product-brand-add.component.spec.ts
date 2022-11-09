import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBrandAddComponent } from './product-brand-add.component';

describe('ProductBrandAddComponent', () => {
  let component: ProductBrandAddComponent;
  let fixture: ComponentFixture<ProductBrandAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductBrandAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductBrandAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

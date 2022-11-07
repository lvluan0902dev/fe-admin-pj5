import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeautyImageEditComponent } from './beauty-image-edit.component';

describe('BeautyImageEditComponent', () => {
  let component: BeautyImageEditComponent;
  let fixture: ComponentFixture<BeautyImageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeautyImageEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeautyImageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

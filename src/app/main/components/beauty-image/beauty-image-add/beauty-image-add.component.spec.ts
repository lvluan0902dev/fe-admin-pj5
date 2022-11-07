import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeautyImageAddComponent } from './beauty-image-add.component';

describe('BeautyImageAddComponent', () => {
  let component: BeautyImageAddComponent;
  let fixture: ComponentFixture<BeautyImageAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeautyImageAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeautyImageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

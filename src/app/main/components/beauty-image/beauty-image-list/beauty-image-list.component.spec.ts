import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeautyImageListComponent } from './beauty-image-list.component';

describe('BeautyImageListComponent', () => {
  let component: BeautyImageListComponent;
  let fixture: ComponentFixture<BeautyImageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeautyImageListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeautyImageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

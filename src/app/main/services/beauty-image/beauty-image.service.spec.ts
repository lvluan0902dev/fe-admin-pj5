import { TestBed } from '@angular/core/testing';

import { BeautyImageService } from './beauty-image.service';

describe('BeautyImageService', () => {
  let service: BeautyImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeautyImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

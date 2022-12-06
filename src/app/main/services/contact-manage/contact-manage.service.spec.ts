import { TestBed } from '@angular/core/testing';

import { ContactManageService } from './contact-manage.service';

describe('ContactManageService', () => {
  let service: ContactManageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactManageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

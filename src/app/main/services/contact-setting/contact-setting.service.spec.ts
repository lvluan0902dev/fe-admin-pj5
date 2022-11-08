import { TestBed } from '@angular/core/testing';

import { ContactSettingService } from './contact-setting.service';

describe('ContactSettingService', () => {
  let service: ContactSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

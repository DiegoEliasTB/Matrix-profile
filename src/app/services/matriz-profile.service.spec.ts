import { TestBed } from '@angular/core/testing';

import { MatrizProfileService } from './matriz-profile.service';

describe('MatrizProfileService', () => {
  let service: MatrizProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatrizProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

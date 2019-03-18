import { TestBed } from '@angular/core/testing';

import { PdbKeysService } from './pdb-keys.service';

describe('PdbKeysService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PdbKeysService = TestBed.get(PdbKeysService);
    expect(service).toBeTruthy();
  });
});

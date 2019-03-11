import { TestBed } from '@angular/core/testing';

import { PdbFindService } from './pdb-find.service';

describe('PdbFindService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PdbFindService = TestBed.get(PdbFindService);
    expect(service).toBeTruthy();
  });
});

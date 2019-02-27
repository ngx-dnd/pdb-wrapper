import { TestBed } from '@angular/core/testing';

import { PdbService } from './pdb.service';

describe('PdbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PdbService = TestBed.get(PdbService);
    expect(service).toBeTruthy();
  });
});

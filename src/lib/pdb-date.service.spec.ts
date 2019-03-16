import { TestBed } from '@angular/core/testing';

import { PdbDataService } from './pdb-date.service';

describe('PdbDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PdbDataService = TestBed.get(PdbDataService);
    expect(service).toBeTruthy();
  });
});

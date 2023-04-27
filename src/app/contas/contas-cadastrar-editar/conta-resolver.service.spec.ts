import { TestBed } from '@angular/core/testing';

import { ContaResolverService } from './conta-resolver.service';

describe('ContaResolverService', () => {
  let service: ContaResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContaResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

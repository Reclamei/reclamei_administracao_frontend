import { TestBed } from '@angular/core/testing';

import { ReclamacaoService } from './reclamacao.service';

describe('ReclamacaoService', () => {
  let service: ReclamacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReclamacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

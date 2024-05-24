/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PagesServiceService } from './pages-service.service';

describe('Service: PagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PagesServiceService]
    });
  });

  it('should ...', inject([PagesServiceService], (service: PagesServiceService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WareHouseService } from './wareHouse.service';

describe('Service: WareHouse', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WareHouseService]
    });
  });

  it('should ...', inject([WareHouseService], (service: WareHouseService) => {
    expect(service).toBeTruthy();
  }));
});

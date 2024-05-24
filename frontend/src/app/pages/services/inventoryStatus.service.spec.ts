/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InventoryStatusService } from './inventoryStatus.service';

describe('Service: InventoryStatus', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InventoryStatusService]
    });
  });

  it('should ...', inject([InventoryStatusService], (service: InventoryStatusService) => {
    expect(service).toBeTruthy();
  }));
});

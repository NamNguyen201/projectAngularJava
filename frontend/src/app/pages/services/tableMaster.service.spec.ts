/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TableMasterService } from './tableMaster.service';

describe('Service: TableMaster', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableMasterService]
    });
  });

  it('should ...', inject([TableMasterService], (service: TableMasterService) => {
    expect(service).toBeTruthy();
  }));
});

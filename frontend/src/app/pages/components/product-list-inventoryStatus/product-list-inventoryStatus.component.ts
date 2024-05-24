import { Component, OnInit } from '@angular/core';
import { InventoryStatusPageModel } from '../../models/inventoryStatus-page';
import { InventoryStatusService } from '../../services/inventoryStatus.service';

@Component({
  selector: 'app-product-list-inventoryStatus',
  templateUrl: './product-list-inventoryStatus.component.html',
  styleUrls: ['./product-list-inventoryStatus.component.css']
})
export class ProductListInventoryStatusComponent implements OnInit {
  private page = 0;
  public inventoryStatus!: InventoryStatusPageModel;
  constructor(private inventoryStatusService: InventoryStatusService) { }

  ngOnInit() {
    this.getAllInventoryStatus();
  }

  public getAllInventoryStatus(): void{
    this.inventoryStatusService.getAllInventoryStatus(this.page).subscribe(
      (response) =>{
        this.inventoryStatus = response;
        // console.log(response);
      }
    )}

}

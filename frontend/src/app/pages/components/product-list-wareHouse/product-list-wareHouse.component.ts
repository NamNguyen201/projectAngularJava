import { WareHouseService } from './../../services/wareHouse.service';
import { WareHousePageModel } from '../../models/wareHouse-page';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list-wareHouse',
  templateUrl: './product-list-wareHouse.component.html',
  styleUrls: ['./product-list-wareHouse.component.scss']
})
export class ProductListWareHouseComponent implements OnInit {
  private page = 0;
  public wareHouse!: WareHousePageModel;
  constructor(private wareHouseService: WareHouseService) { }

  ngOnInit() {
    this.getAllwareHouse();
  }

  public getAllwareHouse(): void{
    this.wareHouseService.getAllwareHouse(this.page).subscribe(
      (response)=> {
        this.wareHouse = response;
        // console.log(response);
      }
    )}

}

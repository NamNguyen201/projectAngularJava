import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../../services/owner.service';
import { OwnerPageModel } from '../../models/owner-page';

@Component({
  selector: 'app-product-list-owner',
  templateUrl: './product-list-owner.component.html',
  styleUrls: ['./product-list-owner.component.scss']
})
export class ProductListOwnerComponent implements OnInit {
  private page = 0;
  public owner!: OwnerPageModel;
  constructor(private ownerService: OwnerService) { }

  ngOnInit() {
    this.getAllOwner();
  }

  public getAllOwner(): void{
    this.ownerService.getAllOwner(this.page).subscribe(
      (response)=>{
        this.owner = response;
        // console.log(response);
      }
    )}
}

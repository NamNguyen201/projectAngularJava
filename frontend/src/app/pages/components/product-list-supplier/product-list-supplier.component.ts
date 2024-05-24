import { Component, OnInit } from '@angular/core';
import { SupplierPageModel } from '../../models/supplier-page';
import { SupplierService } from '../../services/supplier.service';

@Component({
  selector: 'app-product-list-supplier',
  templateUrl: './product-list-supplier.component.html',
  styleUrls: ['./product-list-supplier.component.scss']
})
export class ProductListSupplierComponent implements OnInit {
  private page = 0;
  public supplier!: SupplierPageModel;
  constructor(private supplierService: SupplierService) { }

  ngOnInit() {
    this.getAllSupplier();
  }

  public getAllSupplier(): void{
    this.supplierService.getAllSupplier(this.page).subscribe(
      (response)=>{
        this.supplier = response;
        // console.log(response);
      }
    )}
}

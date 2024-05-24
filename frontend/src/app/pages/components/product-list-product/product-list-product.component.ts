import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductPageModel } from '../../models/product-page';

@Component({
  selector: 'app-product-list-product',
  templateUrl: './product-list-product.component.html',
  styleUrls: ['./product-list-product.component.scss']
})
export class ProductListProductComponent implements OnInit {
  private page = 0;
  public product!: ProductPageModel;
  constructor(private productService : ProductService) { }

  ngOnInit() {
    this.getAllProduct();
  }
  

  public getAllProduct(): void{
   this.productService.getAllProduct(this.page).subscribe(
    (response)=>{
      this.product = response;
      // console.log(response);
    }
   )}
}

import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ProductPageModel } from '../../models/product-page';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../models/product';
import { isUndefined } from 'lodash';

const COLUMNS_SCHEMA = [
  {key: 'id', type: 'text', label: 'No.'},
  {key: 'codeProduct',type: 'text',label: 'CodeProduct'},
  {key: 'nameProduct',type: 'text',label: 'NameProduct'},
  {key: 'note',type: 'text',label: 'Note'},
  {key: 'isEdit',type: 'isEdit',label: 'Action'},
];

@Component({
  selector: 'app-product-screen2',
  templateUrl: './product-screen2.component.html',
  styleUrls: ['./product-screen2.component.scss']
})
export class ProductScreen2Component implements OnInit {
  public displayedColumns: string[] = COLUMNS_SCHEMA.map(col => col.key);
  public columnsSchema: any = COLUMNS_SCHEMA;

  public productFormGroup: FormGroup = new FormGroup({});
  public dataSource = new MatTableDataSource<AbstractControl>([]);

  @Input() product!: ProductPageModel;

  constructor( private fb:FormBuilder) { 
    this.productFormGroup = this.fb.group({
      dataArray: this.fb.array([])
    });
  }

  public ngOnChanges(changes: SimpleChanges): void{
    if(changes['product'] && this.product){
      const lastIndex = this.dataArray.controls.length;

      if(this.product.pageable.pageNumber === 0){
        this.productFormGroup = this.initProductFormGroup(this.product.content);
      }else{

        this.product.content
          .forEach((product,index)=>
            this.dataArray.push(this.mapProductToProductFormGroup(product,lastIndex + index)));
      }
      this.dataSource = new MatTableDataSource(this.dataArray.controls);
      // console.log(this.dataSource);
    }
  }

  public get dataArray(): FormArray{
    return this.productFormGroup.get('dataArray') as FormArray;
  }

  private initProductFormGroup(productArray: Product[]): FormGroup{
    return this.fb.group({
      dataArray: this.fb.array(productArray && productArray.length > 0
        ? productArray.map((productModel: Product, index) => this.mapProductToProductFormGroup(productModel, index))
        : [])
    });
  }

  private mapProductToProductFormGroup(product?: Product, index?: number): FormGroup {
    return this.fb.group({
      index: new FormControl(!isUndefined(index) ? index + 1 : '-'),
      id: new FormControl(product ? product.id : null),
      codeProduct: new FormControl(product ? product.codeProduct : null),
      nameProduct: new FormControl(product ? product?.nameProduct : null),
      note: new FormControl(product ? product?.note : null),
      isEdit:new FormControl('none'),
    });
  }

  ngOnInit() {
  }

}

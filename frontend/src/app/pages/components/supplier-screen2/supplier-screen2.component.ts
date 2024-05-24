import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { SupplierPageModel } from '../../models/supplier-page';
import { Supplier } from '../../models/supplier';
import { isUndefined } from 'lodash';

const COLUMNS_SCHEMA = [
  {key: 'id', type: 'text', label: 'No.'},
  {key: 'codeSupplier',type: 'text',label: 'CodeSupplier'},
  {key: 'nameSupplier',type: 'text',label: 'NameSupplier'},
  {key: 'isEdit',type: 'isEdit',label: 'Action'},
];

@Component({
  selector: 'app-supplier-screen2',
  templateUrl: './supplier-screen2.component.html',
  styleUrls: ['./supplier-screen2.component.scss']
})
export class SupplierScreen2Component implements OnInit {
  public displayedColumns: string[] = COLUMNS_SCHEMA.map(col => col.key);
  public columnsSchema: any = COLUMNS_SCHEMA;

  public supplierFormGroup: FormGroup = new FormGroup({});
  public dataSource = new MatTableDataSource<AbstractControl>([]);

  @Input() supplier!: SupplierPageModel;
  
  constructor(private fb:FormBuilder) { 
    this.supplierFormGroup = this.fb.group({
      dataArray: this.fb.array([])
    });
  }

  ngOnInit() {
  } 

  public ngOnChanges(changes: SimpleChanges): void{
    if(changes['supplier'] && this.supplier){
      const lastIndex = this.dataArray.controls.length;

      if(this.supplier.pageable.pageNumber === 0){
        this.supplierFormGroup = this.initSupplierFormGroup(this.supplier.content);
      }else{

        this.supplier.content
          .forEach((supplier,index)=>
            this.dataArray.push(this.mapSupplierToSupplierFormGroup(supplier,lastIndex + index)));
      }
      this.dataSource = new MatTableDataSource(this.dataArray.controls);
      // console.log(this.dataSource);
    }
  }

  public get dataArray(): FormArray{
    return this.supplierFormGroup.get('dataArray') as FormArray;
  }

  private initSupplierFormGroup(supplierArray: Supplier[]): FormGroup{
    return this.fb.group({
      dataArray: this.fb.array(supplierArray && supplierArray.length > 0
        ? supplierArray.map((supplierPageModel: Supplier, index) => this.mapSupplierToSupplierFormGroup(supplierPageModel, index))
        : [])
    });
  }

  private mapSupplierToSupplierFormGroup(supplier?: Supplier, index?: number): FormGroup {
    return this.fb.group({
      index: new FormControl(!isUndefined(index) ? index +1 : '-'),
      id: new FormControl(supplier ? supplier.id : null),
      codeSupplier: new FormControl(supplier ? supplier.codeSupplier : null),
      nameSupplier: new FormControl(supplier ? supplier?.nameSupplier : null),
      isEdit:new FormControl('none'),

    });
  }

}
9
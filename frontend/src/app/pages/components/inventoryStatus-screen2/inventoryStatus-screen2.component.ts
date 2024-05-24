import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { InventoryStatusPageModel } from '../../models/inventoryStatus-page';
import { InventoryStatus } from '../../models/inventoryStatus';
import { isUndefined } from 'lodash';

const COLUMNS_SCHEMA = [
  {key: 'id', type: 'text', label: 'No.'},
  {key: 'status',type: 'text',label: 'Status'},
  {key: 'isEdit',type: 'isEdit',label: 'Action'},
];

@Component({
  selector: 'app-inventoryStatus-screen2',
  templateUrl: './inventoryStatus-screen2.component.html',
  styleUrls: ['./inventoryStatus-screen2.component.scss']
})
export class InventoryStatusScreen2Component implements OnInit {
  public displayedColumns: string[] = COLUMNS_SCHEMA.map(col => col.key);
  public columnsSchema: any = COLUMNS_SCHEMA;

  public inventoryStatusFormGroup: FormGroup = new FormGroup({});
  public dataSource = new MatTableDataSource<AbstractControl>([]);

  @Input() inventoryStatus!: InventoryStatusPageModel;


  constructor(private fb:FormBuilder) {
    this.inventoryStatusFormGroup = this.fb.group({
      dataArray: this.fb.array([])
    }); 
   }

  ngOnInit() {
  }

  public ngOnChanges(changes: SimpleChanges): void{
    if(changes['inventoryStatus'] && this.inventoryStatus){
      const lastIndex = this.dataArray.controls.length;

      if(this.inventoryStatus.pageable.pageNumber === 0){
        this.inventoryStatusFormGroup = this.initInventoryStatusFormGroup(this.inventoryStatus.content);
      }else{

        this.inventoryStatus.content
          .forEach((inventoryStatus,index)=>
            this.dataArray.push(this.mapInventoryStatusToInventoryStatusFormGroup(inventoryStatus,lastIndex + index)));
      }
      this.dataSource = new MatTableDataSource(this.dataArray.controls);
      // console.log(this.dataSource);
    }
  }

  public get dataArray(): FormArray{
    return this.inventoryStatusFormGroup.get('dataArray') as FormArray;
  }


  private initInventoryStatusFormGroup(inventoryStatusArray: InventoryStatus[]): FormGroup{
    return this.fb.group({
      dataArray: this.fb.array(inventoryStatusArray && inventoryStatusArray.length > 0
        ? inventoryStatusArray.map((inventoryStatusPageModel: InventoryStatus, index) => this.mapInventoryStatusToInventoryStatusFormGroup(inventoryStatusPageModel, index))
        : [])
    });
  }

  private mapInventoryStatusToInventoryStatusFormGroup(inventoryStatus?: InventoryStatus, index?: number): FormGroup {
    return this.fb.group({
      index: new FormControl(!isUndefined(index) ? index + 1 : '-'),
      id: new FormControl(inventoryStatus ? inventoryStatus.id : null),
      status: new FormControl(inventoryStatus ? inventoryStatus.status : null),
      isEdit:new FormControl('none'),
    });
  }

}

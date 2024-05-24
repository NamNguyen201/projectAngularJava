import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { WareHousePageModel } from '../../models/wareHouse-page';
import { WareHouse } from '../../models/wareHouse';
import { isUndefined } from 'lodash';

const COLUMNS_SCHEMA = [
  {key: 'id', type: 'text', label: 'No.'},
  {key: 'nameWareHouse',type: 'text',label: 'NameWarehouse'},
  {key: 'isEdit',type: 'isEdit',label: 'Action'},
];

@Component({
  selector: 'app-wareHouse-screen2',
  templateUrl: './wareHouse-screen2.component.html',
  styleUrls: ['./wareHouse-screen2.component.scss']
})
export class WareHouseScreen2Component implements OnInit {
  public displayedColumns: string[] = COLUMNS_SCHEMA.map(col => col.key);
  public columnsSchema: any = COLUMNS_SCHEMA;

  public wareHouseFormGroup: FormGroup = new FormGroup({});
  public dataSource = new MatTableDataSource<AbstractControl>([]);

  @Input() wareHouse!: WareHousePageModel;

  constructor(private fb:FormBuilder) {
    this.wareHouseFormGroup = this.fb.group({
      dataArray: this.fb.array([])
    });
   }
    
  ngOnInit() {}

  public ngOnChanges(changes: SimpleChanges): void{
    if(changes['wareHouse'] && this.wareHouse){
      const lastIndex = this.dataArray.controls.length;

      if(this.wareHouse.pageable.pageNumber === 0){
        this.wareHouseFormGroup = this.initWareHouseFormGroup(this.wareHouse.content);
      }else{

        this.wareHouse.content
          .forEach((wareHouse,index)=>
            this.dataArray.push(this.mapWareHouseToWareHouseFormGroup(wareHouse,lastIndex + index)));
      }
      this.dataSource = new MatTableDataSource(this.dataArray.controls);
      // console.log(this.dataSource);
    }
  }


  public get dataArray(): FormArray{
    return this.wareHouseFormGroup.get('dataArray') as FormArray;
  }

  private initWareHouseFormGroup(wareHouseArray: WareHouse[]): FormGroup{
    return this.fb.group({
      dataArray: this.fb.array(wareHouseArray && wareHouseArray.length > 0
        ? wareHouseArray.map((wareHousePageModel: WareHouse, index) => this.mapWareHouseToWareHouseFormGroup(wareHousePageModel, index))
        : [])
    });``
  }

  private mapWareHouseToWareHouseFormGroup(wareHouse?: WareHouse, index?: number): FormGroup {
    return this.fb.group({
      index: new FormControl(!isUndefined(index) ? index +1 : '-'),
      id: new FormControl(wareHouse ? wareHouse.id : null),
      nameWareHouse: new FormControl(wareHouse ? wareHouse.nameWarehouse : null),
      
      isEdit:new FormControl('none'),

    });
  }

}

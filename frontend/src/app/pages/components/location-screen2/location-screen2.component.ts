import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { LocationPageModel } from '../../models/location-page';
import { Locations } from '../../models/location';
import { isUndefined } from 'lodash';

const COLUMNS_SCHEMA = [
  {key: 'id', type: 'text', label: 'No.'},
  {key: 'nameLocation',type: 'text',label: 'Id_Location'},
  {key: 'idWarehouse',type: 'text',label: 'Id_Warehouse'},
  {key: 'isEdit',type: 'isEdit',label: 'Action'},
];

@Component({
  selector: 'app-location-screen2',
  templateUrl: './location-screen2.component.html',
  styleUrls: ['./location-screen2.component.scss']
})
export class LocationScreen2Component implements OnInit {
  public displayedColumns: string[] = COLUMNS_SCHEMA.map(col => col.key);
  public columnsSchema: any = COLUMNS_SCHEMA;

  public locationFormGroup: FormGroup = new FormGroup({});
  public dataSource = new MatTableDataSource<AbstractControl>([]);

  @Input() locations!: LocationPageModel;
  constructor(private fb:FormBuilder) {
    this.locationFormGroup = this.fb.group({
      dataArray: this.fb.array([])
    });
  }

  ngOnInit() {
  }

  public ngOnChanges(changes: SimpleChanges): void{
    if(changes['locations'] && this.locations){
      const lastIndex = this.dataArray.controls.length;

      if(this.locations.pageable.pageNumber === 0){
        this.locationFormGroup = this.initLocationFormGroup(this.locations.content);
      }else{

        this.locations.content
          .forEach((locations,index)=>
            this.dataArray.push(this.mapLocationToLocationFormGroup(locations,lastIndex + index)));
      }
      this.dataSource = new MatTableDataSource(this.dataArray.controls);
      // console.log(this.dataSource);
    }
  }


  public get dataArray(): FormArray{
    return this.locationFormGroup.get('dataArray') as FormArray;
  }

  private initLocationFormGroup(locationArray: Locations[]): FormGroup{
    return this.fb.group({
      dataArray: this.fb.array(locationArray && locationArray.length > 0
        ? locationArray.map((locationPageModel: Locations, index) => this.mapLocationToLocationFormGroup(locationPageModel, index))
        : [])
    });
  }

  private mapLocationToLocationFormGroup(locations?: Locations, index?: number): FormGroup {
    return this.fb.group({
      index: new FormControl(!isUndefined(index) ? index + 1 : '-'),
      id: new FormControl(locations ? locations.id : null),
      nameLocation: new FormControl(locations ? locations?.nameLocation : null),
      idWarehouse: new FormControl(locations ? locations.warehouseEntity.id : null),
      isEdit:new FormControl('none'),
    });
  }

}

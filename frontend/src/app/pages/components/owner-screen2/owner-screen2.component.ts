import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { OwnerPageModel } from '../../models/owner-page';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Owner } from '../../models/owner';
import { isUndefined } from 'lodash';

const COLUMNS_SCHEMA = [
  {key: 'id', type: 'text', label: 'No.'},
  {key: 'codeOwner',type: 'text',label: 'CodeOwner'},
  {key: 'nameOwner',type: 'text',label: 'NameOwner'},
  {key: 'isEdit',type: 'isEdit',label: 'Action'},
];

@Component({
  selector: 'app-owner-screen2',
  templateUrl: './owner-screen2.component.html',
  styleUrls: ['./owner-screen2.component.scss']
})
export class OwnerScreen2Component implements OnInit {
  public displayedColumns: string[] = COLUMNS_SCHEMA.map(col => col.key);
  public columnsSchema: any = COLUMNS_SCHEMA;

  public ownerFormGroup: FormGroup = new FormGroup({});
  public dataSource = new MatTableDataSource<AbstractControl>([]);

  @Input() owner!: OwnerPageModel;

  constructor(private fb:FormBuilder) { 
    this.ownerFormGroup = this.fb.group({
      dataArray: this.fb.array([])
    });
  }

  public ngOnChanges(changes: SimpleChanges): void{
    if(changes['owner'] && this.owner){
      const lastIndex = this.dataArray.controls.length;

      if(this.owner.pageable.pageNumber === 0){
        this.ownerFormGroup = this.initOwnerFormGroup(this.owner.content);
      }else{

        this.owner.content
          .forEach((owner,index)=>
            this.dataArray.push(this.mapOwnerToOwnerFormGroup(owner,lastIndex + index)));
      }
      this.dataSource = new MatTableDataSource(this.dataArray.controls);
      // console.log(this.dataSource);
    }
  }

 

  public get dataArray(): FormArray{
    return this.ownerFormGroup.get('dataArray') as FormArray;
  }


  private initOwnerFormGroup(ownerArray: Owner[]): FormGroup{
    return this.fb.group({
      dataArray: this.fb.array(ownerArray && ownerArray.length > 0
        ? ownerArray.map((ownerPageModel: Owner, index) => this.mapOwnerToOwnerFormGroup(ownerPageModel, index))
        : [])
    });
  }

  private mapOwnerToOwnerFormGroup(owner?: Owner, index?: number): FormGroup {
    return this.fb.group({
      index: new FormControl(!isUndefined(index) ? index + 1 : '-'),
      id: new FormControl(owner ? owner.id : null),
      codeOwner: new FormControl(owner ? owner.codeOwner : null),
      nameOwner: new FormControl(owner ? owner.nameOwner : null),
      isEdit:new FormControl('none'),
    });
  }
  ngOnInit() {
  }

}

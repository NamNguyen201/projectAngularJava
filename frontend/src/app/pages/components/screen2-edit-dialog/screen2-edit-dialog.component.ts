import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService as ToastsService } from 'ngx-toastr';
import { TableMasterService } from '../../services/tableMaster.service';
import { TableMaster, blankTableMaster, calculatorButton3Input1, calculatorButton3Input2, calculatorButton3Input3 } from '../../models/tableMaster';
import { TableMasterDto } from '../../models/tableMasterDto';
import { EditTTDialogComponent } from '../../common/editTT-dialog/editTT-dialog.component';
  export interface Element {
    position: number;
    name: string;
    weight: number;
    symbol: string;
  }

  const ELEMENT_DATA: Element[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  ];

  @Component({
    selector: 'app-screen2-edit-dialog',
    templateUrl: './screen2-edit-dialog.component.html',
    styleUrls: ['./screen2-edit-dialog.component.scss']
  })
  export class Screen2EditDialogComponent implements OnInit {
    displayedColumns1: string[] = ['name1-1','name1-2','name2-1','name2-2','name2-3','name3-1','name3-2','name3-3','name3-4'];
    displayedColumns2: string[] = ['weight1-1','weight2-1','weight2-2','weight3-1','weight3-2','weight3-3','weight3-4'];
    displayedColumns3: string[] = ['symbol1-1','symbol1-2','symbol2-1','symbol3-1','symbol3-2','symbol3-3','symbol3-4'];

    public dialogEditFormGroup: FormGroup = new FormGroup({});
    public dataSource = new MatTableDataSource(ELEMENT_DATA);
    public tableMaster: TableMaster = blankTableMaster;
    private formCreated = false; 
    inputChanged: boolean = false;
    constructor(
      private matDialogRef: MatDialogRef<Screen2EditDialogComponent>,
      private tableMasterService: TableMasterService,
      private dialogRef: MatDialogRef<Screen2EditDialogComponent>,
      private toast: ToastsService,
      private fb: FormBuilder,
      private dialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: any /* Nhận id từ component cha là product-list2 component */
    ) { }

    ngOnInit():void {   
      
      this.tableMasterService.findIdTableMaster(this.data.id).subscribe({
        next: response =>{
          this.tableMaster = response;
        },error: err =>{
          // this.toast.warning('xe rac');
          // this.matDialogRef.close();
        }
        ,complete:() =>{
          this.dialogEditFormGroup = this.fb.group({
            /* Form Product */
            productForm: this.fb.group({
              codeProduct: new FormControl({value: this.tableMaster ? this.tableMaster.productEntity.codeProduct : '', disabled: true}, Validators.required),
              nameProduct: new FormControl({value:this.tableMaster ? this.tableMaster.productEntity.nameProduct : '', disabled: true}, Validators.required),
              note: new FormControl({value:this.tableMaster ? this.tableMaster.productEntity.note : '', disabled: true}, Validators.required)
            }),
             /* Form Owner */
            ownerForm: this.fb.group({
              codeOwner: new FormControl({value:this.tableMaster ? this.tableMaster.ownerEntity.codeOwner : '',disabled: true}),
              nameOwner: new FormControl({value:this.tableMaster ? this.tableMaster.ownerEntity.nameOwner : '',disabled: true}),
            }),
            /* Form Supplier */
            supplierForm: this.fb.group({
              codeSupplier: new FormControl({value:this.tableMaster ? this.tableMaster.supplierEntity.codeSupplier : '', disabled: true}, Validators.required),
              nameSupplier: new FormControl({value:this.tableMaster ? this.tableMaster.supplierEntity.nameSupplier : '',disabled: true}),
            }),
           /* Form InventoryStatus */
            inventoryStatusForm: this.fb.group({
              idInventoryStatus: new FormControl(this.tableMaster ? this.tableMaster.inventoryStatusEntity.id:''),
              InventoryStatus: new FormControl({value:this.tableMaster ? this.tableMaster.inventoryStatusEntity.status : '', disabled: true}, Validators.required),
            }),
            
            /* Form Warehouse */
            wareHouseForm: this.fb.group({
              nameWarehouse : new FormControl({value:this.tableMaster ? this.tableMaster.locationEntity.warehouseEntity.nameWarehouse : '',disabled: true},Validators.required),
            }),

            /* Form Location */
            locationForm: this.fb.group({
              nameLocation : new FormControl({value:this.tableMaster ? this.tableMaster.locationEntity.nameLocation : '', disabled: true}, Validators.required),
              idLocation : new FormControl(this.tableMaster ? this.tableMaster.locationEntity.id:''),
            }),
            
            //Date
            /* Form Date */
            matDatepickerForm: this.fb.group({
              matDatepicker: new FormControl({value:this.tableMaster ? this.tableMaster.date :'', disabled: true}, Validators.required),
            }),
            
            /* Form value input */
            valueGroupForm: this.fb.group({
              showRadioButton: new FormControl(this.tableMaster ? this.tableMaster.showRadioButton : '', Validators.required),
              input1: new FormControl(calculatorButton3Input1(this.tableMaster), {validators: Validators.pattern('^[0-9]*$'), updateOn: 'blur'}),
              input2: new FormControl(calculatorButton3Input2(this.tableMaster), {validators: Validators.pattern('^[0-9]*$'), updateOn: 'blur'}),
              input3: new FormControl(calculatorButton3Input3(this.tableMaster), {validators: Validators.pattern('^[0-9]*$'), updateOn: 'blur'}),
              input4: new FormControl(this.tableMaster ? this.tableMaster.number4 :'',{validators:Validators.pattern('^[0-9]*$'),updateOn:'blur'}),
              input5: new FormControl(this.tableMaster ? this.tableMaster.number5 :'',{validators : Validators.pattern('^[0-9]*$'), updateOn:'blur'}),
              input6: new FormControl(this.tableMaster ? this.tableMaster.number6 :'',{validators : Validators.pattern('^[0-9]*$'), updateOn:'blur'}),
              total: new FormControl(this.tableMaster ? this.tableMaster.quantity :'',{validators : Validators.pattern('^[0-9]*$') , updateOn:'blur'}),
            }),

          });
          
          /* Disable input theo showRadioButton */
          this.dialogEditFormGroup.get('valueGroupForm.showRadioButton')?.valueChanges.subscribe((value)=>{
            switch (value) {
              case 1:
                this.dialogEditFormGroup.get('valueGroupForm.input2')?.disable();
                this.dialogEditFormGroup.get('valueGroupForm.input3')?.disable();
                this.dialogEditFormGroup.get('valueGroupForm.input2')?.patchValue(0,{emitEvent: false});
                this.dialogEditFormGroup.get('valueGroupForm.input3')?.patchValue(0,{emitEvent: false});
                break;
              case 2:
                this.dialogEditFormGroup.get('valueGroupForm.input2')?.enable();
                this.dialogEditFormGroup.get('valueGroupForm.input3')?.disable();
                this.dialogEditFormGroup.get('valueGroupForm.input3')?.patchValue(0,{emitEvent: false});
                break;
              case 3:
                this.dialogEditFormGroup.get('valueGroupForm.input2')?.enable();
                this.dialogEditFormGroup.get('valueGroupForm.input3')?.enable();
                break;
            }
          });
          /* Gán giá trí lại cho showRadioButton để disable */
          this.dialogEditFormGroup.get('valueGroupForm.showRadioButton')?.patchValue(this.tableMaster.showRadioButton);
          /* valueChange 6 ô input */
          this.dialogEditFormGroup.get('valueGroupForm')?.valueChanges.subscribe(() => {
            const input1Value = this.dialogEditFormGroup.get('valueGroupForm.input1')?.value;
            const input2Value = this.dialogEditFormGroup.get('valueGroupForm.input2')?.value;
            const input3Value = this.dialogEditFormGroup.get('valueGroupForm.input3')?.value;
            const input4Value = this.dialogEditFormGroup.get('valueGroupForm.input4')?.value;
            const input5Value = this.dialogEditFormGroup.get('valueGroupForm.input5')?.value;
            const input6Value = this.dialogEditFormGroup.get('valueGroupForm.input6')?.value;
            
            /* Tính Tổng */
            const totalInput1456256356 = (input1Value * input4Value * input5Value * input6Value) + (input2Value * input5Value * input6Value) + (input3Value * input6Value);
            
            /* Tính giá trị mới cho 3 ô input */
            const input1N = Math.floor(totalInput1456256356 /(input4Value * input5Value * input6Value));
            const input2N = Math.floor((totalInput1456256356 - (input1N * input4Value * input5Value *input6Value))/(input5Value *input6Value));
            const input3N = Math.floor((totalInput1456256356 - (input1N * input4Value * input5Value *input6Value) -  (input2N *input5Value *input6Value))/input6Value);
            /* Gán giá trị mới */
            this.dialogEditFormGroup.get('valueGroupForm.total')?.patchValue(totalInput1456256356,{ emitEvent: false });
            this.dialogEditFormGroup.get('valueGroupForm.input1')?.patchValue(input1N,{ emitEvent: false });
            this.dialogEditFormGroup.get('valueGroupForm.input2')?.patchValue(input2N,{ emitEvent: false });
            this.dialogEditFormGroup.get('valueGroupForm.input3')?.patchValue(input3N,{ emitEvent: false });
               
          });
        }
      });
    }
    
  public get allLoad():boolean{
    return this.tableMaster.id !== 0;
  }
    
  public onEditScreen2() {
    const tableMasterDto: TableMasterDto = {
      date: this.dialogEditFormGroup.get('matDatepickerForm.matDatepicker')?.value,
      showRadioButton: this.dialogEditFormGroup.get('valueGroupForm.showRadioButton')?.value,
      quantity: this.dialogEditFormGroup.get('valueGroupForm.total')?.value,
      number4: this.dialogEditFormGroup.get('valueGroupForm.input4')?.value,
      number5: this.dialogEditFormGroup.get('valueGroupForm.input5')?.value,
      number6: this.dialogEditFormGroup.get('valueGroupForm.input6')?.value,
      codeProduct: this.dialogEditFormGroup.get('productForm.codeProduct')?.value,
      codeOwner: this.dialogEditFormGroup.get('ownerForm.codeOwner')?.value,
      codeSupplier: this.dialogEditFormGroup.get('supplierForm.codeSupplier')?.value,
      idLocation: this.dialogEditFormGroup.get('locationForm.idLocation')?.value,
      idInventoryStatus: this.dialogEditFormGroup.get('inventoryStatusForm.idInventoryStatus')?.value,
    
    }
    
    const id = this.data.id;
    const dialogRef = this.dialog.open(EditTTDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tableMasterService.updateTableMaster(id,tableMasterDto).subscribe(data => {  
          this.dialogRef.close(false);
          this.toast.success('Edit Success');
        }, error => {
          this.toast.error('Edit Failed');
        });
      }
    });
  }

  public onCancelEditScreen2(): void{
    this.dialogRef.close(false);
  }
}

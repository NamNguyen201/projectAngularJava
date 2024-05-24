import { TableMasterService } from '../../services/tableMaster.service';
import { SupplierService } from '../../services/supplier.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Owner } from '../../models/owner';
import { OwnerService } from '../../services/owner.service';
import { Supplier } from '../../models/supplier';
import { InventoryStatus } from '../../models/inventoryStatus';
import { InventoryStatusService } from '../../services/inventoryStatus.service';
import { WareHouseService } from '../../services/wareHouse.service';
import { WareHouse } from '../../models/wareHouse';
import { Locations } from '../../models/location';
import { LocationService } from '../../services/location.service';
import { TableMasterDto } from '../../models/tableMasterDto';
import { AddDialogComponent } from '../../common/add-dialog/edit-dialog.component';
import { ToastrService as ToastsService } from 'ngx-toastr';
import { TableMasterCheckAddDto } from '../../models/tableMasterCheckAddDto';
import { TableMasterCheck6 } from '../../models/tableMasterCheck6';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  selector: 'app-screen2-dialog',
  templateUrl: './screen2-dialog.component.html',
  styleUrls: ['./screen2-dialog.component.scss']
})
export class Screen2DialogComponent implements OnInit {
  displayedColumns1: string[] = ['name1-1','name1-2','name2-1','name2-2','name2-3','name3-1','name3-2','name3-3','name3-4'];
  displayedColumns2: string[] = ['weight1-1','weight2-1','weight2-2','weight3-1','weight3-2','weight3-3','weight3-4'];
  displayedColumns3: string[] = ['symbol1-1','symbol1-2','symbol2-1','symbol3-1','symbol3-2','symbol3-3','symbol3-4'];
  /* Khởi tạo form */
  public dialogAddFormGroup: FormGroup = new FormGroup({});
  /* Truyền ELEMENT_DATA  vào dataSource tạo một dòng để add*/
  public dataSource = new MatTableDataSource(ELEMENT_DATA);
  /* Product Model */
  public product!: Product;
  public nameProduct!: string;
  public note!: string;
  /* Owner Model */
  public owner!: Owner;
  public nameOwner!: string;
  /* Supplier Model */
  public supplier!: Supplier;
  public nameSupplier!: string;
  /* InventoryStatus Model */
  public inventoryStatus: InventoryStatus[] = [];
  /* WareHouse Model */
  public wareHouse: WareHouse[] = [];
  /* Location Model */
  public location: Locations[] = [];

  /* Khai báo giá trị mặc định so sánh tổng có > 0 mới cho add */
  public intermediateTotal = 0;
  /* khởi tạo biến chứa chuối code product, owner và supplier để tìm kiếm, thực hiện onBlur */
  public codeProductValue!: string;
  public codeOwnerValue!: string;
  public codeSupplierValue!: string;
  /* Mat tooltip */
  public toolTipCodeProduct = "Enter Product Code"
  public toolTipCodeOwner = "Enter Owner Code"
  public toolTipCodeSupplier = "Enter Supplier Code"

  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<Screen2DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private productService: ProductService,
    private ownerService: OwnerService,
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private inventoryStatusService: InventoryStatusService,
    private wareHouseService: WareHouseService,
    private locationService: LocationService,
    private tableMasterService: TableMasterService,
    private dialog: MatDialog,
    private toast: ToastsService

  ) { }
   
  ngOnInit() {
    // this.tableMasterService.getAllTableMaster(this.page);
    this.dialogAddFormGroup = this.fb.group({
      /* Form Check 5 key */
      Group5keyFormGroup: this.fb.group({
        /* Form Product */
        productForm: this.fb.group({
          idProduct: new FormControl(''),
          codeProduct: new FormControl(null,{validators:Validators.required, updateOn:'blur'}),
          nameProduct: new FormControl({value:null,disabled:true}),
          note: new FormControl({value:null,disabled:true}),
        }),
        
        /* Form Owner */
        ownerForm: this.fb.group({
          idOwner: new FormControl(''),
          codeOwner: new FormControl(null,{validators:Validators.required, updateOn:'blur'}),
          nameOwner: new FormControl({value:null,disabled:true}),
        }),
      
        /* Form Supplier */
        supplierForm: this.fb.group({
          idSupplier: new FormControl(''),
          codeSupplier: new FormControl(null,{validators:Validators.required, updateOn:'blur'}),
          nameSupplier: new FormControl({value:null,disabled:true}),
        }),

        /* Form InventoryStatus */
        inventoryStatusForm: this.fb.group({
          idInventoryStatus: new FormControl('', Validators.required),
        }),

        /* Form Warehouse */
        wareHouseForm: this.fb.group({
          nameWarehouse : new FormControl(null, Validators.required),
        }),

        /* Form Location */
        locationForm: this.fb.group({
          idLocation : new FormControl('', Validators.required),
        }),
      }),
        
        /* Form Show RadioButton */
        showRadioButtonForm: this.fb.group({
          showRadioButton: new FormControl(1),
        }),

         /* Form Date */
         matDatepickerForm: this.fb.group({
          matDatepicker: new FormControl(null, Validators.required),
        }),

      /* Form Value Input */
      valueGroupForm: this.fb.group({
        input1: new FormControl(0,[Validators.pattern('^[0-9]*$')]),
        input2: new FormControl({value:0,disabled:true},[Validators.pattern('^[0-9]*$')]),
        input3: new FormControl({value:0,disabled:true},[Validators.pattern('^[0-9]*$')]),
        input4: new FormControl(0,[Validators.pattern('^[0-9]*$')]),
        input5: new FormControl(0,[Validators.pattern('^[0-9]*$')]),
        input6: new FormControl(0,[Validators.pattern('^[0-9]*$')]),
        total: new FormControl({value:0,disabled:true}),
      }),

    }); 
    

    this.dialogAddFormGroup.get('showRadioButtonForm.showRadioButton')?.valueChanges.subscribe((value) =>{
      // console.log(values);
      switch (value) {
        case 1:
          this.dialogAddFormGroup.get('valueGroupForm.input2')?.disable();
          this.dialogAddFormGroup.get('valueGroupForm.input3')?.disable();
          break;
        case 2:
          this.dialogAddFormGroup.get('valueGroupForm.input2')?.enable();
          this.dialogAddFormGroup.get('valueGroupForm.input3')?.disable();
          break;
        case 3:
          this.dialogAddFormGroup.get('valueGroupForm.input2')?.enable();
          this.dialogAddFormGroup.get('valueGroupForm.input3')?.enable();
          break;  
        default:
          break;
      }
    });
  
    //List option wareHouse
    this.wareHouseService.getOnlyListWareHouse().subscribe(
      (data) =>{
        this.wareHouse = data as WareHouse[];
      }
    );

    //List option inventoryStatus
    this.inventoryStatusService.getOnlyListInventoryStatus().subscribe(
      (data) =>{
        this.inventoryStatus = data as InventoryStatus[];
      }
    );

    //Value input
      this.dialogAddFormGroup.get('valueGroupForm')?.valueChanges.subscribe(
        () =>{
          this.totalInput7();
      });

      this.dialogAddFormGroup.get('showRadioButtonForm.showRadioButton')?.valueChanges.subscribe(
        () =>{
          this.totalInput7();
      });

      /* Call Api check 5 bộ key trước khi lưu */
      this.dialogAddFormGroup.get('Group5keyFormGroup')?.valueChanges.subscribe(() =>{
          const  idProduct = this.dialogAddFormGroup.get('Group5keyFormGroup.productForm.idProduct')?.value;
          const  idOwner = this.dialogAddFormGroup.get('Group5keyFormGroup.ownerForm.idOwner')?.value;
          const  idSupplier = this.dialogAddFormGroup.get('Group5keyFormGroup.supplierForm.idSupplier')?.value;
          const  idLocation = this.dialogAddFormGroup.get('Group5keyFormGroup.locationForm.idLocation')?.value;
          const  idInventoryStatus = this.dialogAddFormGroup.get('Group5keyFormGroup.inventoryStatusForm.idInventoryStatus')?.value;
         
          const isInputComplete = idProduct && idOwner && idSupplier && idLocation && idInventoryStatus;
          
          if(isInputComplete){
            const tableMasterCheck6 : TableMasterCheck6 = {
              idProduct: idProduct,
              idOwner: idOwner,
              idSupplier: idSupplier,
              idLocation: idLocation,
              idInventoryStatus: idInventoryStatus,
            }
            this.tableMasterService.findByCheckDto(tableMasterCheck6).subscribe({
              next : response =>{
                if(response){
                  this.dialogAddFormGroup.get('valueGroupForm.input1')?.disable();
                  this.dialogAddFormGroup.get('valueGroupForm.input2')?.disable();
                  this.dialogAddFormGroup.get('valueGroupForm.input3')?.disable();
                  this.dialogAddFormGroup.get('valueGroupForm.input4')?.disable();
                  this.dialogAddFormGroup.get('valueGroupForm.input5')?.disable();
                  this.dialogAddFormGroup.get('valueGroupForm.input6')?.disable();
                  this.dialogAddFormGroup.get('showRadioButtonForm.showRadioButton')?.disable();
                  this.snackBar.open('Duplicate key set', 'Close', { duration: 5000 });
                  
                }else{
                  this.dialogAddFormGroup.get('valueGroupForm.input1')?.enable();
                  this.dialogAddFormGroup.get('valueGroupForm.input2')?.enable();
                  this.dialogAddFormGroup.get('valueGroupForm.input3')?.enable();
                  this.dialogAddFormGroup.get('valueGroupForm.input4')?.enable();
                  this.dialogAddFormGroup.get('valueGroupForm.input5')?.enable();
                  this.dialogAddFormGroup.get('valueGroupForm.input6')?.enable();
                  this.dialogAddFormGroup.get('showRadioButtonForm.showRadioButton')?.enable();
                }
              }
            });
          }       
      });
  }

  public totalInput7(){
    const input1Value = this.dialogAddFormGroup.get('valueGroupForm.input1')?.value;
    const input2Value = this.dialogAddFormGroup.get('valueGroupForm.input2')?.value;
    const input3Value = this.dialogAddFormGroup.get('valueGroupForm.input3')?.value;
    const input4Value = this.dialogAddFormGroup.get('valueGroupForm.input4')?.value;
    const input5Value = this.dialogAddFormGroup.get('valueGroupForm.input5')?.value;
    const input6Value = this.dialogAddFormGroup.get('valueGroupForm.input6')?.value;
    const Value = this.dialogAddFormGroup.get('showRadioButtonForm.showRadioButton')?.value;
    const totalInput1456 = input1Value * input4Value * input5Value * input6Value;
    const totalInput1456256 = (input1Value * input4Value * input5Value * input6Value) + (input2Value * input5Value * input6Value);
    const totalInput1456256356 = (input1Value * input4Value * input5Value * input6Value) + (input2Value * input5Value * input6Value)+(input3Value * input6Value);
    if(Value == 1 ){
      this.dialogAddFormGroup.get('valueGroupForm.total')?.setValue(totalInput1456);
    }else if(Value == 2)
    {
      this.dialogAddFormGroup.get('valueGroupForm.total')?.setValue(totalInput1456256);
    }else  {
      this.dialogAddFormGroup.get('valueGroupForm.total')?.setValue(totalInput1456256356);
    }
  }

  //List option location
  public changeClient(value: number) {
    // console.log(value);
     this.locationService.findIdWareHouse(value).subscribe(
      (data) =>{
        this.location = data as Locations[];
        // console.log(data);
      }
    )
  }
  
  public onAddScreen2(){
    const tableMasterDto: TableMasterDto = {
      date: this.dialogAddFormGroup.get('matDatepickerForm.matDatepicker')?.value,
      showRadioButton: this.dialogAddFormGroup.get('showRadioButtonForm.showRadioButton')?.value,
      quantity: this.dialogAddFormGroup.get('valueGroupForm.total')?.value,
      number4: this.dialogAddFormGroup.get('valueGroupForm.input4')?.value,
      number5: this.dialogAddFormGroup.get('valueGroupForm.input5')?.value,
      number6: this.dialogAddFormGroup.get('valueGroupForm.input6')?.value,
      codeProduct: this.dialogAddFormGroup.get('Group5keyFormGroup.productForm.codeProduct')?.value,
      codeOwner: this.dialogAddFormGroup.get('Group5keyFormGroup.ownerForm.codeOwner')?.value,
      codeSupplier: this.dialogAddFormGroup.get('Group5keyFormGroup.supplierForm.codeSupplier')?.value,
      idLocation: this.dialogAddFormGroup.get('Group5keyFormGroup.locationForm.idLocation')?.value,
      idInventoryStatus: this.dialogAddFormGroup.get('Group5keyFormGroup.inventoryStatusForm.idInventoryStatus')?.value,
    }
    if(this.dialogAddFormGroup.get('valueGroupForm.total')?.value > this.intermediateTotal){
      const dialogRef = this.dialog.open(AddDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.tableMasterService.addTableMasterDto(tableMasterDto).subscribe({
            next: data => {
              this.dialogRef.close(false);
              this.toast.success('Add Success');
            },
            error: err => {
              this.toast.error('Add Failed');
            }
          });
        }
      });
    }else{
      this.snackBar.open('Total không hợp lệ', 'Close', { duration: 5000 });
    }
  }


  public onCancelAddScreen2(): void{
    this.dialogRef.close(false);
  }

  public onBlurCodeProduct() {   
    this.codeProductValue = this.dialogAddFormGroup.get('Group5keyFormGroup.productForm.codeProduct')?.value
    if( this.codeProductValue !== null){
      this.productService.findNameByCode(this.codeProductValue).subscribe(
        (response) => {
          if(response){
            this.dialogAddFormGroup.get('Group5keyFormGroup.productForm.idProduct')?.setValue(response.id);
            this.dialogAddFormGroup.get('Group5keyFormGroup.productForm.codeProduct')?.setValue(response.codeProduct);
            this.dialogAddFormGroup.get('Group5keyFormGroup.productForm.nameProduct')?.setValue(response.nameProduct);
            this.dialogAddFormGroup.get('Group5keyFormGroup.productForm.note')?.setValue(response.note); 
          }else{
            this.dialogAddFormGroup.get('Group5keyFormGroup.productForm.codeProduct')?.setErrors({'notFound': true});
            this.dialogAddFormGroup.get('Group5keyFormGroup.productForm.idProduct')?.reset();
            this.dialogAddFormGroup.get('Group5keyFormGroup.productForm.nameProduct')?.reset();
            this.dialogAddFormGroup.get('Group5keyFormGroup.productForm.note')?.reset();
          }
          
      })
    }
  }

  public onBlurCodeOwner() {
    this.codeOwnerValue = this.dialogAddFormGroup.get('Group5keyFormGroup.ownerForm.codeOwner')?.value;
    if(this.codeOwnerValue !== null){
      this.ownerService.findNameByCode(this.codeOwnerValue).subscribe(
        (response) =>{
          if(response){
            this.dialogAddFormGroup.get('Group5keyFormGroup.ownerForm.idOwner')?.setValue(response.id);
            this.dialogAddFormGroup.get('Group5keyFormGroup.ownerForm.codeOwner')?.setValue(response.codeOwner);
            this.dialogAddFormGroup.get('Group5keyFormGroup.ownerForm.nameOwner')?.setValue(response.nameOwner);
          }else{
            this.dialogAddFormGroup.get('Group5keyFormGroup.ownerForm.codeOwner')?.setErrors({'notFound': true});
            this.dialogAddFormGroup.get('Group5keyFormGroup.ownerForm.idOwner')?.reset();
            this.dialogAddFormGroup.get('Group5keyFormGroup.ownerForm.nameOwner')?.reset();
          }
          
      })
    }
  }

  public onBlurCodeSupplier(){
    this.codeSupplierValue = this.dialogAddFormGroup.get('Group5keyFormGroup.supplierForm.codeSupplier')?.value;
    if(this.codeSupplierValue !== null){
      this.supplierService.findNameByCode(this.codeSupplierValue).subscribe(
        (response) =>{
          if(response){
            this.dialogAddFormGroup.get('Group5keyFormGroup.supplierForm.idSupplier')?.setValue(response.id);
            this.dialogAddFormGroup.get('Group5keyFormGroup.supplierForm.codeSupplier')?.setValue(response.codeSupplier);
            this.dialogAddFormGroup.get('Group5keyFormGroup.supplierForm.nameSupplier')?.setValue(response.nameSupplier);
          }else{
            this.dialogAddFormGroup.get('Group5keyFormGroup.supplierForm.codeSupplier')?.setErrors({'notFound': true});
            this.dialogAddFormGroup.get('Group5keyFormGroup.supplierForm.idSupplier')?.reset();
            this.dialogAddFormGroup.get('Group5keyFormGroup.supplierForm.nameSupplier')?.reset();
          }
         
        }
      )
    }
  }

}

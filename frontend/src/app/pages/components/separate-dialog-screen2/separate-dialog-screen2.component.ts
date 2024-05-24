import { WareHouseService } from './../../services/wareHouse.service';
import { Component, HostListener, Inject, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TableMasterService } from '../../services/tableMaster.service';
import { TableMaster, blankTableMaster, calculatorButton3Input1, calculatorButton3Input2, calculatorButton3Input3 } from '../../models/tableMaster';
import { ProductService } from '../../services/product.service';
import { OwnerService } from '../../services/owner.service';
import { SupplierService } from '../../services/supplier.service';
import { WareHouse } from '../../models/wareHouse';
import { LocationService } from '../../services/location.service';
import { Locations } from '../../models/location';
import { InventoryStatusService } from '../../services/inventoryStatus.service';
import { InventoryStatus } from '../../models/inventoryStatus';
import { TableMasterCheck6 } from '../../models/tableMasterCheck6';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SaveDoubleForm } from '../../models/tableMasterDto';
import { ToastrService as ToastsService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { ChartComponent } from '../chart/chart.component';

export interface Element {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
];

@Component({
  selector: 'app-separate-dialog-screen2',
  templateUrl: './separate-dialog-screen2.component.html',
  styleUrls: ['./separate-dialog-screen2.component.scss']
})
export class SeparateDialogScreen2Component implements OnInit, OnChanges {
  displayedColumns1: string[] = ['name1-1','name1-2','name2-1','name2-2','name2-3','name3-1','name3-2','name3-3','name3-4'];
  displayedColumns2: string[] = ['weight1-1','weight2-1','weight2-2','weight3-1','weight3-2','weight3-3','weight3-4'];
  displayedColumns3: string[] = ['symbol1-1','symbol1-2','symbol2-1','symbol3-1','symbol3-2','symbol3-3','symbol3-4'];
  public dialogSeparateFormGroup: FormGroup = new FormGroup({});
  public dataSource = new MatTableDataSource(ELEMENT_DATA);
  public tableMaster: TableMaster = blankTableMaster;

  /* khởi tạo biến chứa chuối code product, owner và supplier để tìm kiếm, thực hiện onBlur */
  public codeProductValue!: string;
  public codeOwnerValue!: string;
  public codeSupplierValue!: string;

  // public saveDoubleFormClass : saveDoubleFormClass = new saveDoubleFormClass();
  public wareHouse: WareHouse[] = [];
  public location: Locations[] = [];
  public inventoryStatus: InventoryStatus[] = [];
  /* Tạo biến để lưu total vừa thay đổi như thế nào so vơi total ban đầu */
  public intermediateTotal = 0;
  /* Biến để tính toán cho total input số 7 */
  public totalDB = 0;
  /* Khởi tạo matToolTip */
  public toolTipCodeProduct = "Enter Product Code"
  public toolTipCodeOwner = "Enter Owner Code"
  public toolTipCodeSupplier = "Enter Supplier Code"
  
  constructor(
    private dialog: MatDialog,
    private toast: ToastsService,
    private snackBar: MatSnackBar,
    private inventoryStatusService : InventoryStatusService,
    private locationService: LocationService,
    private wareHouseService: WareHouseService,
    private supplierService: SupplierService,
    private ownerService : OwnerService,
    private productService: ProductService,
    private dialogRef: MatDialogRef<SeparateDialogScreen2Component>,
    private tableMasterService: TableMasterService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    
    // console.log(this.data.id);
    this.tableMasterService.findIdTableMaster(this.data.id).subscribe({
      next: response => {
        this.tableMaster = response;
        
      },error: err =>{
        //xử lý lỗi 
      }
      ,complete:() =>{
        this.dialogSeparateFormGroup = this.fb.group({
          /* Form Check 5 Key */
          Group5keyFormGroup: this.fb.group({
                //async validator
                // viet api de doi. call blur produc owner supplier
            /* Form Product */
            productForm: this.fb.group({
              idProduct: new FormControl(''),
              codeProduct: new FormControl('',{validators:Validators.required, updateOn:'blur'}),
              nameProduct: new FormControl({value:'',disabled: true}),
              note: new FormControl({value:'',disabled: true}),   
            }),
            /* Form Owner */
            ownerForm: this.fb.group({
              idOwner: new FormControl(''),
              codeOwner: new FormControl('',{validators:Validators.required, updateOn:'blur'}),
              nameOwner: new FormControl({value:'',disabled: true}),
            }),
            /* Form Supplier */
            supplierForm: this.fb.group({
              idSupplier: new FormControl(''),
              codeSupplier: new FormControl('',{validators:Validators.required, updateOn:'blur'}),
              nameSupplier: new FormControl({value:'',disabled: true}),
            }),
            /* Form InventoryStatuc */
            inventoryStatusForm: this.fb.group({
              idInventoryStatus: new FormControl(''),
            }),
            /* Form Warehouse */
            wareHouseForm: this.fb.group({
              IdWarehouse : new FormControl('',Validators.required),
            }),
            /* Form Location */
            locationForm: this.fb.group({
              idLocation : new FormControl(''),
            }),
            
          }),
          /* Form Date */
          matDatepickerForm: this.fb.group({
            matDatepicker: new FormControl('', Validators.required),
          }),
          
          /* Form Show RadioButton */
          showRadioButtonForm: this.fb.group({
            showRadioButton: new FormControl({value:'',disabled: true}),
            totalTong: new FormControl(this.tableMaster ? this.tableMaster.quantity: ''),
          }),

          /* Form Value Input */
          valueGroupForm: this.fb.group({
            input1: new FormControl({value:0,disabled: true},{validators : Validators.pattern('^[0-9]*$'), updateOn:'blur'}),
            input2: new FormControl({value:0,disabled: true},{validators : Validators.pattern('^[0-9]*$'), updateOn:'blur'}),
            input3: new FormControl({value:0,disabled: true},{validators : Validators.pattern('^[0-9]*$'), updateOn:'blur'}),
            input4: new FormControl({value:0,disabled: true},{validators : Validators.pattern('^[0-9]*$'), updateOn:'blur'}),
            input5: new FormControl({value:0,disabled: true},{validators : Validators.pattern('^[0-9]*$'), updateOn:'blur'}),
            input6: new FormControl({value:0,disabled: true},{validators : Validators.pattern('^[0-9]*$'), updateOn:'blur'}),
            total: new FormControl({value:0,disabled: true},{validators : Validators.pattern('^[0-9]*$'), updateOn:'blur'}),
          }),
        });
        /* List Option WareHouse */
        this.wareHouseService.getOnlyListWareHouse().subscribe(
          (data) =>{
            this.wareHouse = data as WareHouse[];
          }
        )
        /* List Option InventoryStatus */
        this.inventoryStatusService.getOnlyListInventoryStatus().subscribe(
          (data) =>{
            this.inventoryStatus = data as InventoryStatus[];
          }
        )


        /* Disable Input Show Radio Button */
        this.dialogSeparateFormGroup.get('showRadioButtonForm.showRadioButton')?.patchValue(this.tableMaster.showRadioButton);
        this.dialogSeparateFormGroup.get('showRadioButtonForm.showRadioButton')?.valueChanges.subscribe((value)=>{
          switch (value){
            case 1:
              this.dialogSeparateFormGroup.get('valueGroupForm.input2')?.disable();
              this.dialogSeparateFormGroup.get('valueGroupForm.input3')?.disable();

              this.dialogSeparateFormGroup.get('valueGroupForm.input2')?.patchValue(0, {emitEvent: false})
              this.dialogSeparateFormGroup.get('valueGroupForm.input3')?.patchValue(0, {emitEvent: false})
              break;
            case 2:
              this.dialogSeparateFormGroup.get('valueGroupForm.input2')?.enable();
              this.dialogSeparateFormGroup.get('valueGroupForm.input3')?.disable();

              this.dialogSeparateFormGroup.get('valueGroupForm.input3')?.patchValue(0, {emitEvent: false})

              break;
            case 3:
              this.dialogSeparateFormGroup.get('valueGroupForm.input2')?.enable();
              this.dialogSeparateFormGroup.get('valueGroupForm.input3')?.enable();
              break;
          }
        });

        /* Call Api Check 5 Key */
        this.dialogSeparateFormGroup.get('Group5keyFormGroup')?.valueChanges.pipe(debounceTime(500)).subscribe(() => {
          const idProduct = this.dialogSeparateFormGroup.get('Group5keyFormGroup.productForm.idProduct')?.value;
          const idOwner = this.dialogSeparateFormGroup.get('Group5keyFormGroup.ownerForm.idOwner')?.value;
          const idSupplier = this.dialogSeparateFormGroup.get('Group5keyFormGroup.supplierForm.idSupplier')?.value;
          const idInventoryStatus = this.dialogSeparateFormGroup.get('Group5keyFormGroup.inventoryStatusForm.idInventoryStatus')?.value;
          const IdWarehouse = this.dialogSeparateFormGroup.get('Group5keyFormGroup.wareHouseForm.IdWarehouse')?.value;
          const idLocation = this.dialogSeparateFormGroup.get('Group5keyFormGroup.locationForm.idLocation')?.value;

          // console.log(idProduct,idOwner,idSupplier,idInventoryStatus,IdWarehouse,idLocation);
          

          const isInputComplete = idProduct && idOwner && idSupplier && idInventoryStatus && IdWarehouse && idLocation;
        
          if (isInputComplete) {
            /* Kiểm tra 5 bộ key có bằng với 5 bộ key khi nhấn Edit không  */
            if (idProduct === this.tableMaster.productEntity.id &&
              idOwner === this.tableMaster.ownerEntity.id &&
              idSupplier === this.tableMaster.supplierEntity.id &&
              idInventoryStatus === this.tableMaster.inventoryStatusEntity.id &&
              IdWarehouse === this.tableMaster.locationEntity.warehouseEntity.id &&
              idLocation === this.tableMaster.locationEntity.id) {
              this.snackBar.open('Duplicate key set', 'Close', { duration: 5000 });

              
                this.dialogSeparateFormGroup.get('valueGroupForm.input1')?.disable({emitEvent: false});
                this.dialogSeparateFormGroup.get('valueGroupForm.input2')?.disable({emitEvent: false});
                this.dialogSeparateFormGroup.get('valueGroupForm.input3')?.disable({emitEvent: false});
                this.dialogSeparateFormGroup.get('valueGroupForm.input4')?.disable({emitEvent: false});
                this.dialogSeparateFormGroup.get('valueGroupForm.input5')?.disable({emitEvent: false});
                this.dialogSeparateFormGroup.get('valueGroupForm.input6')?.disable({emitEvent: false});
                this.dialogSeparateFormGroup.get('showRadioButtonForm.showRadioButton')?.disable({emitEvent: false});
            }else{
              const tableMasterCheck6: TableMasterCheck6 = {
                idProduct: this.dialogSeparateFormGroup.get('Group5keyFormGroup.productForm.idProduct')?.value,
                idOwner: this.dialogSeparateFormGroup.get('Group5keyFormGroup.ownerForm.idOwner')?.value,
                idSupplier: this.dialogSeparateFormGroup.get('Group5keyFormGroup.supplierForm.idSupplier')?.value,
                idLocation: this.dialogSeparateFormGroup.get('Group5keyFormGroup.locationForm.idLocation')?.value,
                idInventoryStatus: this.dialogSeparateFormGroup.get('Group5keyFormGroup.inventoryStatusForm.idInventoryStatus')?.value,
              }
              
              this.tableMasterService.findByCheckDto(tableMasterCheck6).subscribe({
                next: response => {
                    if(response){
                      this.dialogSeparateFormGroup.get('matDatepickerForm.matDatepicker')?.patchValue(response.date, { emitEvent: false });
                      this.dialogSeparateFormGroup.get('valueGroupForm.total')?.patchValue(response.quantity, { emitEvent: false });
                      this.dialogSeparateFormGroup.get('valueGroupForm.input4')?.patchValue(response.number4, { emitEvent: false });
                      this.dialogSeparateFormGroup.get('valueGroupForm.input5')?.patchValue(response.number5, { emitEvent: false });
                      this.dialogSeparateFormGroup.get('valueGroupForm.input6')?.patchValue(response.number6, { emitEvent: false });
                      this.dialogSeparateFormGroup.get('showRadioButtonForm.showRadioButton')?.patchValue(response.showRadioButton, { emitEvent: false });
                      this.totalDB = response.quantity;
                      const input1Value = calculatorButton3Input1(response);
                      const input2Value = calculatorButton3Input2(response);
                      const input3Value = calculatorButton3Input3(response);
          
                      this.dialogSeparateFormGroup.get('valueGroupForm.input1')?.patchValue(input1Value, { emitEvent: false });
                      this.dialogSeparateFormGroup.get('valueGroupForm.input2')?.patchValue(input2Value, { emitEvent: false });
                      this.dialogSeparateFormGroup.get('valueGroupForm.input3')?.patchValue(input3Value, { emitEvent: false });

                      this.dialogSeparateFormGroup.get('valueGroupForm.input1')?.enable({emitEvent: false});
                      this.dialogSeparateFormGroup.get('valueGroupForm.input2')?.enable({emitEvent: false});
                      this.dialogSeparateFormGroup.get('valueGroupForm.input3')?.enable({emitEvent: false});
                      this.dialogSeparateFormGroup.get('valueGroupForm.input4')?.disable({emitEvent: false});
                      this.dialogSeparateFormGroup.get('valueGroupForm.input5')?.disable({emitEvent: false});
                      this.dialogSeparateFormGroup.get('valueGroupForm.input6')?.disable({emitEvent: false});
                      this.dialogSeparateFormGroup.get('showRadioButtonForm.showRadioButton')?.enable({emitEvent: false});

                      this.intermediateTotal = this.dialogSeparateFormGroup.get('valueGroupForm.total')?.value;
                      
                    }
                    else{
                      this.dialogSeparateFormGroup.get('valueGroupForm.input1')?.enable({emitEvent: false});
                      this.dialogSeparateFormGroup.get('valueGroupForm.input2')?.enable({emitEvent: false});
                      this.dialogSeparateFormGroup.get('valueGroupForm.input3')?.enable({emitEvent: false});
                      this.dialogSeparateFormGroup.get('valueGroupForm.input4')?.enable({emitEvent: false});
                      this.dialogSeparateFormGroup.get('valueGroupForm.input5')?.enable({emitEvent: false});
                      this.dialogSeparateFormGroup.get('valueGroupForm.input6')?.enable({emitEvent: false});
                      this.dialogSeparateFormGroup.get('showRadioButtonForm.showRadioButton')?.enable({emitEvent: false});
                      
                      this.dialogSeparateFormGroup.get('valueGroupForm.input1')?.patchValue(0, { emitEvent: false });
                      this.dialogSeparateFormGroup.get('valueGroupForm.input2')?.patchValue(0, { emitEvent: false });
                      this.dialogSeparateFormGroup.get('valueGroupForm.input3')?.patchValue(0, { emitEvent: false });
                      this.dialogSeparateFormGroup.get('valueGroupForm.input4')?.patchValue(0, { emitEvent: false });
                      this.dialogSeparateFormGroup.get('valueGroupForm.input5')?.patchValue(0, { emitEvent: false });
                      this.dialogSeparateFormGroup.get('valueGroupForm.input6')?.patchValue(0, { emitEvent: false });
                      this.dialogSeparateFormGroup.get('valueGroupForm.total')?.patchValue(0, { emitEvent: false });
                      this.dialogSeparateFormGroup.get('showRadioButtonForm.showRadioButton')?.patchValue(3,{emitEvent: false});
                      this.dialogSeparateFormGroup.get('matDatepickerForm.matDatepicker')?.patchValue('', { emitEvent: false });

                      this.intermediateTotal = 0;
                      
                    }
                }, error: err =>{
                  
                }

              }) 
              
            }
          }
        });
        
        /* Lấy giá trị ô input truyền vào hàm totalInput7 */
        this.dialogSeparateFormGroup.get('valueGroupForm')?.valueChanges.subscribe(
          () => {
            this.totalInput7();
        });
      }
    }); 
  }

  public totalInput7(){
    const input1Value = this.dialogSeparateFormGroup.get('valueGroupForm.input1')?.value;
    const input2Value = this.dialogSeparateFormGroup.get('valueGroupForm.input2')?.value;
    const input3Value = this.dialogSeparateFormGroup.get('valueGroupForm.input3')?.value;
    const input4Value = this.dialogSeparateFormGroup.get('valueGroupForm.input4')?.value;
    const input5Value = this.dialogSeparateFormGroup.get('valueGroupForm.input5')?.value;
    const input6Value = this.dialogSeparateFormGroup.get('valueGroupForm.input6')?.value;

    const totalInput1456256356 = (input1Value * input4Value * input5Value * input6Value) + (input2Value * input5Value * input6Value)+(input3Value * input6Value);
   
    /* Tính giá trị mới cho 3 ô input  */
    const input1N = Math.floor(totalInput1456256356 /(input4Value * input5Value * input6Value));
    const input2N = Math.floor((totalInput1456256356 - (input1N * input4Value * input5Value *input6Value))/(input5Value *input6Value));
    const input3N = Math.floor((totalInput1456256356 - (input1N * input4Value * input5Value *input6Value) -  (input2N *input5Value *input6Value))/input6Value);

    /* Gán giá trị mới */
    this.dialogSeparateFormGroup.get('valueGroupForm.total')?.patchValue(totalInput1456256356,{ emitEvent: false });
    const totals = totalInput1456256356 - this.totalDB;
    // this.dialogSeparateFormGroup.get('showRadioButtonForm.totalTong')?.reset();
    this.dialogSeparateFormGroup.get('showRadioButtonForm.totalTong')?.patchValue(this.tableMaster.quantity - totals,{ emitEvent: false });
    /* Gán giá trị cho 3 ô input */
    this.dialogSeparateFormGroup.get('valueGroupForm.input1')?.patchValue(input1N,{emitEvent: false});
    this.dialogSeparateFormGroup.get('valueGroupForm.input2')?.patchValue(input2N,{emitEvent: false});
    this.dialogSeparateFormGroup.get('valueGroupForm.input3')?.patchValue(input3N,{emitEvent: false});

   
  }

  public onBlurCodeProduct(){
    this.codeProductValue = this.dialogSeparateFormGroup.get('Group5keyFormGroup.productForm.codeProduct')?.value;
   
    if(this.codeProductValue !== ''){
      this.productService.findNameByCode(this.codeProductValue).subscribe(
        (response) => {
          if(response){
            this.dialogSeparateFormGroup.get('Group5keyFormGroup.productForm.idProduct')?.setValue(response.id);
            this.dialogSeparateFormGroup.get('Group5keyFormGroup.productForm.codeProduct')?.setValue(response.codeProduct);
            this.dialogSeparateFormGroup.get('Group5keyFormGroup.productForm.nameProduct')?.setValue(response.nameProduct);
            this.dialogSeparateFormGroup.get('Group5keyFormGroup.productForm.note')?.setValue(response.note);
          }else{
            this.dialogSeparateFormGroup.get('Group5keyFormGroup.productForm.codeProduct')?.setErrors({'notFound':true});
            this.dialogSeparateFormGroup.get('Group5keyFormGroup.productForm.idProduct')?.reset();
            this.dialogSeparateFormGroup.get('Group5keyFormGroup.productForm.nameProduct')?.reset();
            this.dialogSeparateFormGroup.get('Group5keyFormGroup.productForm.note')?.reset();
          }
        }
      )
    }
  }

  public onBlurOwner(){
    this.codeOwnerValue = this.dialogSeparateFormGroup.get('Group5keyFormGroup.ownerForm.codeOwner')?.value;
    if(this.codeOwnerValue !== ''){
      this.ownerService.findNameByCode(this.codeOwnerValue).subscribe(
        (response) => {
          if(response){
            this.dialogSeparateFormGroup.get('Group5keyFormGroup.ownerForm.idOwner')?.setValue(response.id);
            this.dialogSeparateFormGroup.get('Group5keyFormGroup.ownerForm.codeOwner')?.setValue(response.codeOwner);
            this.dialogSeparateFormGroup.get('Group5keyFormGroup.ownerForm.nameOwner')?.setValue(response.nameOwner);
          }else{
            this.dialogSeparateFormGroup.get('Group5keyFormGroup.ownerForm.codeOwner')?.setErrors({'notFound':true});
            this.dialogSeparateFormGroup.get('Group5keyFormGroup.ownerForm.idOwner')?.reset();
            this.dialogSeparateFormGroup.get('Group5keyFormGroup.ownerForm.nameOwner')?.reset();
          }
         
        }
      )
    }
  }

  public onBlurCodeSupplier(){
    this.codeSupplierValue = this.dialogSeparateFormGroup.get('Group5keyFormGroup.supplierForm.codeSupplier')?.value;
    if(this.codeSupplierValue !== ''){
      this.supplierService.findNameByCode(this.codeSupplierValue).subscribe(
        (response) => {
          if(response){
            this.dialogSeparateFormGroup.get('Group5keyFormGroup.supplierForm.idSupplier')?.setValue(response.id);
            this.dialogSeparateFormGroup.get('Group5keyFormGroup.supplierForm.codeSupplier')?.setValue(response.codeSupplier);
            this.dialogSeparateFormGroup.get('Group5keyFormGroup.supplierForm.nameSupplier')?.setValue(response.nameSupplier);
          }else{
            this.dialogSeparateFormGroup.get('Group5keyFormGroup.supplierForm.codeSupplier')?.setErrors({'notFound':true});
            this.dialogSeparateFormGroup.get('Group5keyFormGroup.supplierForm.idSupplier')?.reset();
            this.dialogSeparateFormGroup.get('Group5keyFormGroup.supplierForm.nameSupplier')?.reset();
          }
          
        }
      )
    } 
  }

  /* List Option Location */
  public getIdWareHouseForLocation(value: number){
    this.locationService.findIdWareHouse(value).subscribe(
      (data) =>{
        this.location = data as Locations[];
      }
    )
  }

  public calculatorQuantity(tableMaster: TableMaster, type: string): string{  
    switch(type){
      case('one'):
        return calculatorButton3Input1(tableMaster).toString();
      case('two'):
        return calculatorButton3Input2(tableMaster).toString();
      case('three'):
        return calculatorButton3Input3(tableMaster).toString();
      default:
        return '';
    }
  }

  public get allLoad():boolean{
    return this.tableMaster.id !== 0;
  }

  public onCancelSeparateScreen2(): void{
    this.dialogRef.close(false);
  }

  public onSeparateScreen2(){
  
    const saveDoubleForm : SaveDoubleForm = {
      idProduct: this.dialogSeparateFormGroup.get('Group5keyFormGroup.productForm.idProduct')?.value,
      idOwner: this.dialogSeparateFormGroup.get('Group5keyFormGroup.ownerForm.idOwner')?.value,
      idSupplier: this.dialogSeparateFormGroup.get('Group5keyFormGroup.supplierForm.idSupplier')?.value,
      idLocation: this.dialogSeparateFormGroup.get('Group5keyFormGroup.locationForm.idLocation')?.value,
      idInventoryStatus: this.dialogSeparateFormGroup.get('Group5keyFormGroup.inventoryStatusForm.idInventoryStatus')?.value,
      date: this.dialogSeparateFormGroup.get('matDatepickerForm.matDatepicker')?.value,
      showRadioButton: this.dialogSeparateFormGroup.get('showRadioButtonForm.showRadioButton')?.value,
      number4: this.dialogSeparateFormGroup.get('valueGroupForm.input4')?.value,
      number5: this.dialogSeparateFormGroup.get('valueGroupForm.input5')?.value,
      number6: this.dialogSeparateFormGroup.get('valueGroupForm.input6')?.value,
      quantity: this.dialogSeparateFormGroup.get('valueGroupForm.total')?.value,

      idFormSetSeparate: this.data.id,
      totalTong: this.dialogSeparateFormGroup.get('showRadioButtonForm.totalTong')?.value
    } 

    if(this.dialogSeparateFormGroup.get('showRadioButtonForm.totalTong')?.value >=0 && 
      this.dialogSeparateFormGroup.get('showRadioButtonForm.totalTong')?.value < this.tableMaster.quantity &&
      this.dialogSeparateFormGroup.get('valueGroupForm.total')?.value > this.intermediateTotal){
      this.tableMasterService.updateOrCreate(saveDoubleForm).subscribe({
        next: response =>{
          this.dialogRef.close(false);
          this.toast.success('Divided Success')
        }
      });
    }else {
      this.snackBar.open('Total không hợp lệ', 'Close', { duration: 5000 });
    }
  }

  // @HostListener('keydown.enter', ['$event'])
  // public onKeyDown(event: KeyboardEvent) {
  // event.preventDefault(); // Ngăn chặn sự kiện mặc định của phím Enter
  // const inputs = Array.from(document.querySelectorAll('input'));
  // const current = inputs.indexOf(event.target as HTMLInputElement);
  // const next = inputs[current + 1] as HTMLInputElement;
  // if (next) {
  //   next.focus();
  // }

  
  public onChart(id: number){
    const dialogRef = this.dialog.open(ChartComponent,{
      width: '800px', height: '450px',
      disableClose: false,
      data:{id : id}
    })
  }
  // @HostListener('keydown.enter')
  // onEnter() {
  //   console.log('ok enter');
    
  // }
  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.focusNextElement(event.target as HTMLElement);
    }
  }
  public focusNextElement(currentElement: HTMLElement) {
    const tabindexAttr = currentElement.getAttribute('tabindex');
    const tabindex = tabindexAttr !== null ? parseInt(tabindexAttr, 10) : 0;
    const nextElement = document.querySelector(`[tabindex="${tabindex + 1}"]`) as HTMLElement | null;
  
    if (nextElement) {
      nextElement.focus();
    }
  }


}


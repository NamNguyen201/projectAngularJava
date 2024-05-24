import { Element } from './../separate-dialog-screen2/separate-dialog-screen2.component';
import { EmployeePageModel } from './../../models/employee-page';
import { Employee } from './../../models/employee';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, FormControl, FormArray, AbstractControl, Validators } from '@angular/forms';
import { Component, Input, OnInit, SimpleChanges, OnChanges, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
// import { Employee } from '../../models/employee';
import { isUndefined, get } from 'lodash';
import { MatSnackBar } from '@angular/material/snack-bar';

const COLUMNS_SCHEMA = [
  {key: 'id', type: 'text', label: 'No.'},
  {key: 'code',type: 'text',label: '名称'},
  {key: 'name',type: 'text',label: '商品分類コード'},
  {key: 'isEdit',type: 'isEdit',label: '操作'},
];

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnChanges {
  public displayedColumns: string[] = COLUMNS_SCHEMA.map(col => col.key);
  public columnsSchema: any = COLUMNS_SCHEMA;
  @Input() employees!: EmployeePageModel;
  @Output() formSaveAddRow = new EventEmitter<Employee>;
  @Output() formSaveEditRow = new EventEmitter<Employee>;
  @Output() deleteRowId= new EventEmitter<number>;
  @Output() outputLoadMore = new EventEmitter();
  public productFormGroup: FormGroup = new FormGroup({});
  @ViewChild('container') public container !: ElementRef;
  public dataSource = new MatTableDataSource<AbstractControl>([]);
  private editedElement: FormGroup | null = null;
  private employee1: Employee = {
    id:0,
    code:'',
    name:''
  };

  // private employee1: Employee[] = [],
  // Khai báo dataSource là MatTableDataSource<AbstractControl> nhưng trong ngOnChanges bạn lại 
  // gán giá trị cho nó là MatTableDataSource<FormGroup>. 
  // Bạn cần đảm bảo kiểu dữ liệu của dataSource phù hợp để tránh gây lỗi.

  
  constructor( 
    private snackBar: MatSnackBar,
    private fb:FormBuilder ) { 
    this.productFormGroup = this.fb.group({
      dataArray: this.fb.array([])
    });
  }

  public ngOnChanges(changes: SimpleChanges): void{
    if (changes['employees'] && this.employees) {
      const lastIndex = this.dataArray.controls.length;

      if(this.employees.pageable.pageNumber === 0){
        this.productFormGroup = this.initEmployeeFormGroup(this.employees.content);
      } else{

        this.employees.content
          .forEach((employee, index) => 
            this.dataArray.push(this.mapEmployeeToEmployeeFormGroup(employee, lastIndex + index)));
      }
      this.dataSource = new MatTableDataSource(this.dataArray.controls);
      // console.log(this.employees);
    }
  }
  public get dataArray(): FormArray {
    return this.productFormGroup.get('dataArray') as FormArray;
  }

  private initEmployeeFormGroup(employeesArray: Employee[]): FormGroup {
    return this.fb.group({
      dataArray: this.fb.array(employeesArray && employeesArray.length > 0
        ? employeesArray.map((employeeModel: Employee, index) => this.mapEmployeeToEmployeeFormGroup(employeeModel, index))
        : [])
    });
  }
  
  private mapEmployeeToEmployeeFormGroup(employee?: Employee, index?: number): FormGroup {
    return this.fb.group({
      index: new FormControl(!isUndefined(index) ? index + 1 : '-'),
      id: new FormControl(employee ? employee.id : null,),
      code: new FormControl(employee ? employee.code : null, Validators.required),
      name: new FormControl(employee ? employee.name : null, Validators.required),
      isEdit:new FormControl('none'),
      delete_status: new FormControl(false)
    });
  }

 
  
  public addRow() {
    /*  Lấy FormGroup tại vị trí [0] trong dataArray  */
    const firstRow = this.dataArray.at(0);
    if(firstRow.get('isEdit')?.value !== 'add'){
      this.dataArray.insert(0,this.mapEmployeeToEmployeeFormGroup());
      this.dataArray.controls[0].get('isEdit')?.setValue('add');
      this.dataSource = new MatTableDataSource(this.dataArray.controls);
    }else{
      this.snackBar.open('Add một cái thôi ba ', 'Close', { duration: 5000 });
    }
    
  }

  public saveAdd(element: FormGroup) {
    const code = element.get('code')?.value;
    const name = element.get('name')?.value;
    if(code !== null && name !== null){
      this.formSaveAddRow.emit(element.getRawValue());
      element.get('isEdit')?.setValue('add');
      this.dataSource = new MatTableDataSource(this.dataArray.controls);

    }
    else{
      this.snackBar.open('Các trường không được để trống', 'Close', { duration: 5000 });
    }

  }

  public cancelAdd(element: FormGroup): void{
    this.dataArray.removeAt(0);
    this.dataSource = new MatTableDataSource(this.dataArray.controls);
    element.get('isEdit')?.setValue('none');
}


  public editRow(element: FormGroup) {
    if( this.editedElement !== null && this.editedElement !== element){
      /* Đã có đối tượng khác đang được chỉnh sửa, không thực hiện gì cả */
      return;
    }else{
      element.get('isEdit')?.setValue('edit');
      /* Tạo biến chứa element để không cho edit nhiều cái cùng một lúc */
      this.editedElement = element;

      this.employee1 = {
        id: element.get('id')?.value,
        code: element.get('code')?.value,
        name: element.get('name')?.value,
      };

    }
  } 

  public cancelEdit(element : FormGroup) {
    element.get('isEdit')?.setValue('none');
    this.editedElement = null; 
  }

  public saveEdit(element: FormGroup){

    // const employee2: Employee = {
    //   id: element.get('id')?.value,
    //   code: element.get('code')?.value,
    //   name: element.get('name')?.value,
    // };
    // console.log(element);
    // console.log(this.employee1);
    
    if(this.employee1?.code === element.get('code')?.value && 
      this.employee1?.name === element.get('name')?.value)
    {
        this.snackBar.open('gia tri khong thay doi', 'Close', { duration: 5000 });
    }else{
       /* Các giá trị đã thay đổi */
      this.formSaveEditRow.emit(element.getRawValue());
      element.get('isEdit')?.setValue('edit');
      this.dataSource = new MatTableDataSource(this.dataArray.controls)
      this.editedElement = null;
    }
  }

  

  private deleteRow(element: FormGroup) :void{
    this.deleteRowId.emit(element.get('id')?.value);
  }

  private loadMoreProduct(): void{
    this.outputLoadMore.emit();
  }

  public onBtnClick(action: string, event?: FormGroup) {
    switch(action) {      
      case 'addNewRow': 
        this.addRow()
      break;

      case 'saveAdd':
        if(event) {
          this.saveAdd(event)
        }       
      break;

      case 'cancelAdd':
        if(event){
          this.cancelAdd(event);
        }
      break;

      case 'edit':
        if(event){
          this.editRow(event)
        }
      break;
     
      case 'saveEdit':
        if(event){
          this.saveEdit(event)
        }
      break;

      case 'cancelEdit':
        if(event){
          this.cancelEdit(event);
        }
      break;

      case 'deleteRow':
      if(event){
        this.deleteRow(event);
      }
      break;

      case 'showMore':
        this.loadMoreProduct();
      break;
   } 
 }
  
}

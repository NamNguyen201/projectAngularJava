import { finalize } from 'rxjs';
import { ToastrService as ToastsService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { PagesServiceService } from './../../services/pages-service.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeePageModel } from '../../models/employee-page';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../common/delete-dialog/delete-dialog.component';
import { AddDialogComponent } from '../../common/add-dialog/edit-dialog.component';
import { EditTTDialogComponent } from '../../common/editTT-dialog/editTT-dialog.component';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public searchValue: string = '';
  private page = 0;
  public employees!: EmployeePageModel;
  public employeeList: Employee[] = [];

  constructor(private pagesServiceService : PagesServiceService,
              private dialog: MatDialog,
              private toast: ToastsService) { }
 
  ngOnInit(): void {
    this.getAllEmployee();

  }

  public getAllEmployee(): void {
    this.pagesServiceService.getAllEmployees(this.page).subscribe(
      (response) => {
        this.employees = response;
        // console.log(response);  
      })
  }

  public onSaveAdd(formSaveRow: Employee){
    const dialogRef = this.dialog.open(AddDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.pagesServiceService.addEmployees(formSaveRow).subscribe(data => {
          this.toast.success('Add Success');
          this.getAllEmployee();
        });
      }else{
        // this.getAllEmployee();
      }
    });
  }

  public onSaveEdit(formSaveEdit: Employee){
    const dialogRef = this.dialog.open(EditTTDialogComponent);
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.pagesServiceService.updateEmployees(formSaveEdit).subscribe(data => {
          this.toast.success('Edit Success');
          this.getAllEmployee();
        });
      }
    })
  }

  public onDeleteRow(Id: number){
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.pagesServiceService.deleteEmployees(Id).subscribe(data => {
          this.getAllEmployee();
          this.toast.success('Delete Success');
        });
      }
    });
  }

  public loadMoreProduct(): void{
    this.pagesServiceService.getAllEmployees(++this.page).subscribe(data => {
      this.employees = data;
    })
  }

  public onSearchPage(searchValue: string){
    this.searchValue = searchValue;
    this.page = 0;
    this.pagesServiceService.findSearchAndPage(searchValue, this.page).subscribe(data =>{
      this.employees = data;
      this.employeeList = data.content;
    });  
  }

  public resetListEmployee(): void{
    this.page = 0;
    this.pagesServiceService.getAllEmployees(this.page).subscribe(
      (response) => {
        this.employees = response;
    })
  }

}

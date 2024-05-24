import { convertFullToHalf } from './../../../common/utils/event';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableMasterPageModel } from '../../models/tableMaster-page';
import { TableMasterService } from '../../services/tableMaster.service';
import { Screen2DialogComponent } from '../screen2-add-dialog/screen2-dialog.component';
import { Screen2EditDialogComponent } from '../screen2-edit-dialog/screen2-edit-dialog.component';
import { SeparateDialogScreen2Component } from '../separate-dialog-screen2/separate-dialog-screen2.component';
import { result } from 'lodash';

@Component({
  selector: 'app-product-list2',
  templateUrl: './product-list2.component.html',
  styleUrls: ['./product-list2.component.scss']
})
export class ProductList2Component implements OnInit {

  public searchValue: string = '';
  private page = 0;
  public tableMaster!: TableMasterPageModel;

  constructor(
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private tableMasterService: TableMasterService
  ) { }

  ngOnInit() {
    this.getAllTableMaster();
  }

  public getAllTableMaster(): void{
    this.tableMasterService.getAllTableMaster(this.page).subscribe(
      (response) => {
        this.tableMaster = response;
      })
  }

  public callDialogScreen2Add() {
    const dialogRef = this.dialog.open(Screen2DialogComponent, {
      width: '',
      height: '',
      disableClose: true,
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.getAllTableMaster();
    });
  }

  public outputCallDialogScreen2Separate(id : number){
    const dialogRef = this.dialog.open(SeparateDialogScreen2Component,{
      width: '',
      height: '',
      disableClose: true,
      data:{id : id}
    });
    dialogRef.afterClosed().subscribe(result =>{
      this.getAllTableMaster();
    })
  }

  public callDialogScreen2Edit(id : number) {
    const dialogRef = this.dialog.open(Screen2EditDialogComponent, {
      width: '',
      height: '',
      disableClose: true,
      data:{id : id}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.getAllTableMaster();
    });
  }

  public onSearchPage(searchValue: string){
    this.searchValue = searchValue;
    this.page = 0;
    this.tableMasterService.findProductOwnerSupplierTableMaster(searchValue,this.page).subscribe(data =>{
      this.tableMaster = data;
    });
  }

  public resetListTableMaster(){
    this.page = 0;
    this.tableMasterService.getAllTableMaster(this.page).subscribe(data =>{
      this.tableMaster = data;
    });
  }

  public loadMoreTableMaster(){
    this.tableMasterService.getAllTableMaster(++this.page).subscribe(data => {
      this.tableMaster = data;
      // this.tableMaster.content = [...this.tableMaster.content, ...data.content];
    });
  }
}

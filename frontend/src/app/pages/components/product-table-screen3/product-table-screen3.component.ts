import { Element } from '../screen2-add-dialog/screen2-dialog.component';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableMasterPageModel } from '../../models/tableMaster-page';
import { TableMaster, calculatorButton3Input2, calculatorButton3Input3, calculatorButton3Input1 } from '../../models/tableMaster';
import { TableMasterService } from '../../services/tableMaster.service';
import { ChartComponent } from '../chart/chart.component';
import { MatDialog } from '@angular/material/dialog';
import { ApextChartComponent } from '../apext-chart/apext-chart.component';

@Component({
  selector: 'app-product-table-screen3',
  templateUrl: './product-table-screen3.component.html',
  styleUrls: ['./product-table-screen3.component.scss']
})
export class ProductTableScreen3Component implements OnInit, OnChanges {
  displayedColumns1: string[] = ['position', 'name1-1','name1-2','name2-1','name2-2','name2-3','name3-1','name3-2','name3-3','name3-4','action'];
  displayedColumns2: string[] = ['weight1-1','weight2-1','weight2-2','weight3-1','weight3-2','weight3-3','weight3-4'];
  displayedColumns3: string[] = ['symbol1-1','symbol1-2','symbol2-1','symbol3-1','symbol3-2','symbol3-3','symbol3-4'];
  @Output() outputCallDialogScreen2Add = new EventEmitter();
  @Output() outputCallDialogScreen2Separate = new EventEmitter();
  @Output() outputCallDialogScreen2Edit = new EventEmitter<number>();
  @Output() outputButtonShowMore = new EventEmitter();
  @Input() tableMaster!: TableMasterPageModel;

  public dataSource = new MatTableDataSource<TableMaster>;
  dataTotal=new MatTableDataSource<TableMaster>;
  public dataReal:TableMaster[] = [];
  constructor(
    private dialog: MatDialog
    ,private cdr: ChangeDetectorRef) {
   }
 
  ngOnInit() {
  

  }

  public ngOnChanges(changes: SimpleChanges): void{
    if(changes['tableMaster'] && this.tableMaster){
      const lastIndex = this.tableMaster.content.length;
      
      if(this.tableMaster.pageable.pageNumber === 0){
        this.dataSource = new MatTableDataSource(this.tableMaster.content);
        this.dataReal.push(...this.tableMaster.content)
      }
      else{
        const newData = this.tableMaster.content.map((item, index) => ({...item,index: lastIndex + index +1 }));
        this.dataReal.push(...newData);
        
        this.dataSource=new MatTableDataSource(this.dataReal);
       
      }
      // this.dataSource = new MatTableDataSource(this.tableMaster.content);
      // this.cdr.detectChanges();
    }
    // console.log(this.tableMaster);
    
  }



  public calculatorQuantity(element: TableMaster, type: string): string{
    switch(type) {
      case('one'):
        return calculatorButton3Input1(element).toString();
        
      case('two'):
        return calculatorButton3Input2(element).toString();
      case('three'):
        return calculatorButton3Input3(element).toString();
      default:
        return '';
    }
  }

  public openDialogScreen2(){
    this.outputCallDialogScreen2Add.emit();
  }

  public openDialogScreen2Edit(id :number){
    // console.log(id);
    this.outputCallDialogScreen2Edit.emit(id);
  }

  public openDialogScreen2Separate(id :number){

    this.outputCallDialogScreen2Separate.emit(id);
  }

  public onBtnClickShowMore(){
    this.outputButtonShowMore.emit();    
  }

  public openDialogChart(id: number){
    const dialogRef = this.dialog.open(ChartComponent,{
      width: '800px', height: '460px',
      disableClose: false,
      data:{id : id}
    })
  }

  public openDialogApextChart(id: number){
    const dialogRef = this.dialog.open(ApextChartComponent,{
      width: '800px', height: '460px',
      disableClose: false,
      data:{id : id}
    })
  }
}

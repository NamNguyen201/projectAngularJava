import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChartDataset, ChartOptions, ChartTypeRegistry, ScriptableContext } from 'chart.js';
import { HistoryService } from '../../services/history.service';
import * as moment from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import 'chartjs-plugin-zoom';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart } from 'chart.js';
import 'chartjs-adapter-moment';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  public dataChart:number[] = [];
  public dataChartIndex: string[] = [];
  public lineChartLabelData: string[] = [];
  
  public startDate?: Date;
  public endDate?: Date;

  @ViewChild('picker1') picker1: MatDatepicker<Date> | undefined;
  @ViewChild('picker2') picker2: MatDatepicker<Date> | undefined; 
  
  constructor(
    public historyService: HistoryService,
    public dialogRef: MatDialogRef<ChartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any /* Nhận id từ component cha là seprate-dialog-screen */
    ) { }

  ngOnInit() {
    // Đăng ký plugin zoom
    Chart.register(zoomPlugin);

    const dateNow = new Date();
    const dateBefore = new Date();

    dateBefore.setDate(dateNow.getDate() - 9999);
    /* Goi api */
    this.historyService.getListHistory(this.data.id, dateNow, dateBefore).subscribe(data => {
      
      for(let i of data){ 
        this.dataChart.push(i.beforeTotal);
        
        /* dinh dang hien thi thoi gian  */
        const formatDateTime = moment(i.localDateTime).format("DD-MM-YYYY HH:mm");
        this.lineChartLabelData.push(formatDateTime);
      }
      // this.dataChartIndex = this.lineChartDataLabels(this.dataChart.length)
    })
  }

  /* Truyen gia tri tu button(html) vao phuong thuc */
  public handleClick(timeLine: number): void{
    const dateNow = new Date();
    const dateBefore = new Date();

    dateBefore.setDate(dateNow.getDate() - timeLine);

    this.historyService.getListHistory(this.data.id, dateNow, dateBefore).subscribe(data => {
      this.dataChart = [];
      this.lineChartLabelData = [];
      

      for(let element of data) {
        this.dataChart.push(element.beforeTotal);
        
        const formatDateTime = moment(element.localDateTime).format("DD-MM-YYYY HH:mm");

        this.lineChartLabelData.push(formatDateTime);
      }
    })
  }
  /* Data dữ liệu thay đổi theo lineChartDataLabels */
  public get lineChartData(): ChartDataset[] {
    // {data: [29, 50, 80, 56, 55, 40,65, 59, 90, 56, 55, 40], label:'sonochoa'}
    return [{
      data: this.dataChart, 
      label:'sonochoa',
      /* Đổ màu bên dưới đường chart  */
      fill: true,
      borderColor: '#008ffb',
      /* thêm 80 ở sau để tạo opacity */
      // backgroundColor: '#a6d8fd80'
      /* Thay đổi màu điểm nối */
      pointBackgroundColor:'#008ffb',
      backgroundColor: (ctx: ScriptableContext<'bar'>) => {
        const gradientFill = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
        gradientFill.addColorStop(0, '#a6d8fd');
        gradientFill.addColorStop(1, '#ffffff');
        // gradientFill.addColorStop(0, 'rgba(166, 216, 253, 1)'); // Màu ban đầu (toàn độ trong suốt)
        // gradientFill.addColorStop(1, 'rgba(166, 216, 253, 0)'); // Màu kết thúc (toàn độ trong suốt)
        return gradientFill;
      }
    }]
  };

  /* hiển thị dữ liệu thanh ngang bên dưới chart */
  public lineChartDataLabels(length : number): string[] {
    const labels: string[] = [];
    for(let i = 0; i < length; i++){
      labels.push(`${i}`);
    }
    return labels;
  }

  /* Tìm kiếm khoảng thời gian */
  public handleClickSearch(): void {
    const startDate = this.picker1?.startAt;
    const endDate = this.picker2?.startAt;

    if(startDate && endDate){
      this.startDate = startDate as Date;
      this.endDate = endDate as Date;

      this.historyService.getListHistory(this.data.id, this.startDate, this.endDate).subscribe(data => {
        
        this.dataChart = [];
        this.lineChartLabelData = [];

        for( let element of data) {
          this.dataChart.push(element.beforeTotal);

          const formatDateTime = moment(element.localDateTime).format("DD-MM-YYYY HH:mm");

          this.lineChartLabelData.push(formatDateTime);
        }
      }); 
    }
  }

  /* khoi tao gia tri 0 cho truc y , tao chart zoom */
  public lineChartDataOptions: ChartOptions = { 
    responsive: true, 
    scales: {
      y: {
        min: 0
      },
      x:{
        grid: {
          color:'rgba(0,0,0,0)'
        }
      }
    },
    plugins: {
      zoom:{
        pan: {
          enabled: true,
          mode: 'xy'
        },
        zoom: {
          wheel:{
            enabled: true
          },
          pinch: {
            enabled: true
          },
          mode:'xy'
        }
      }
    }
  };

  // /* Các phương thức để thực hiện hành động zoom */
  public zoomIn(): void {
    const chart = Chart.getChart('chart');
    if (chart) {
      chart.zoom({ focalPoint: undefined });
      
    }
  }

  /* Hiển thị chú thích label : sonochoa */
  public lineChartDataLegend = false;

  /* Hinh dang bieu do chart */
  public lineChartDataType : keyof ChartTypeRegistry = 'line';
  
}

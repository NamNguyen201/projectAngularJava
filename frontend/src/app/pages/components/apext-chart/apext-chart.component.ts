import { Component, Inject, OnInit } from '@angular/core';
import { HistoryService } from '../../services/history.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-apext-chart',
  templateUrl: './apext-chart.component.html',
  styleUrls: ['./apext-chart.component.scss']
})
export class ApextChartComponent implements OnInit {
  public chartOptions: any;
  public dataChart: number[] = [];
  public lineChartLabelData: string[] = [];

  constructor(
    public historyService: HistoryService,
    @Inject(MAT_DIALOG_DATA) public data: any /* Nhận id từ component cha là seprate-dialog-screen */

  ) { }

  ngOnInit() {
    const dateNow = new Date();
    const dateBefore = new Date();

    dateBefore.setDate(dateNow.getDate() -9999);

    this.historyService.getListHistory(this.data.id, dateNow, dateBefore).subscribe(data => {
      for(let i of data){
        this.dataChart.push(i.beforeTotal);

        const formatDateTime = moment(i.localDateTime).format("DD-MM-YYYY HH:mm");
        this.lineChartLabelData.push(formatDateTime);
      }

      this.chartOptions = {
        series: [{
          name: 'Sales',
          // data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
          data: this.dataChart
        }],
        chart: {
          height: 350,
          type: 'area',
        },
        xaxis: {
          // categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
          categories: this.lineChartLabelData
        },
      };
    }) 
  }
}

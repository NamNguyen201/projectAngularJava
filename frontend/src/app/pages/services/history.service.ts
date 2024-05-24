import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { List } from 'lodash';
import { Observable, map } from 'rxjs';
import { ChartHistory } from '../models/chart-history.model';
import { ApiPath } from '@core/config';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private _http: HttpClient) {}
  public getListHistory(id: number,dateNow: Date, dateBefore: Date): Observable<ChartHistory[]> {
    const formatDateTimeNow = dateNow.toISOString().slice(0, -1);
    const formatDateTimeBefore = dateBefore.toISOString().slice(0, -1);

     return this._http.get(`${ApiPath.RETURN_OUTPUT_CHART_HISTORY}?id=${id}&localDateTimeNow=${formatDateTimeNow}&localDateTimeBefore=${formatDateTimeBefore}`)
      .pipe(
        map((response: any) => {
          const historyList: ChartHistory[] = response.map((item: any) => {
            return {
              id: item.id,
              beforeTotal: item.beforeTotal,
              masterId: item.masterId,
              localDateTime: item.localDateTime
            };
          });

          return historyList;
        })
      );
  }
}

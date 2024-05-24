import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WareHousePageModel } from '../models/wareHouse-page';
import { ApiPath } from '@core/config';
import { WareHouse } from '../models/wareHouse';

@Injectable({
  providedIn: 'root'
})
export class WareHouseService {

constructor(private http: HttpClient) { }
  public getAllwareHouse(page: number): Observable<WareHousePageModel>{
    return this.http.get<WareHousePageModel>(`${ApiPath.RETURN_OUTPUT_LIST_WAREHOUSE}?page=${page}`)
  }

  public findSearchAndPage(wareHouse: string, pageNumber: number): Observable<WareHousePageModel>{
    return this.http.get<WareHousePageModel>(`${ApiPath.RETURN_OUTPUT_SHOW_PAGE_SEARCH_WAREHOUSE}?any=${wareHouse}&page=${pageNumber}`);
  }

  public addwareHouse(wareHouse: WareHouse): Observable<WareHouse>{
    return this.http.post<any>(`${ApiPath.RETURN_OUTPUT_ADD_WAREHOUSE}`,wareHouse);
  }

  public updatewareHouse(wareHouse: WareHouse): Observable<WareHouse>{
    return this.http.put<any>(`${ApiPath.RETURN_OUTPUT_UPDATE_WAREHOUSE}`, wareHouse);
  }

  public deletewareHouse(wareHouseId: number): Observable<void>{
    return this.http.delete<void>(`${ApiPath.RETURN_OUTPUT_DELETE_WAREHOUSE}/${wareHouseId}`);
  }

  public getOnlyListWareHouse():Observable<WareHouse[]>{
    return this.http.get<WareHouse[]>(`${ApiPath.RETURN_OUTPUT_ONLYLIST_WAREHOUSE}`)
  }
  
}

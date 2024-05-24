import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryStatusPageModel } from '../models/inventoryStatus-page';
import { ApiPath } from '@core/config';
import { InventoryStatus } from '../models/inventoryStatus';

@Injectable({
  providedIn: 'root'
})
export class InventoryStatusService {

constructor(private http: HttpClient) { }
  public getAllInventoryStatus(page: number):Observable<InventoryStatusPageModel>{
    return this.http.get<InventoryStatusPageModel>(`${ApiPath.RETURN_OUTPUT_LIST_INVENTORYSTATUS}?page=${page}`)
  }

  public findSearchAndPage(inventoryStatus: string, pageNumber: number): Observable<InventoryStatusPageModel>{
    return this.http.get<InventoryStatusPageModel>(`${ApiPath.RETURN_OUTPUT_SHOW_PAGE_SEARCH_INVENTORYSTATUS}?any=${inventoryStatus}&page=${pageNumber}`);
  }

  public addInventoryStatus(inventoryStatus: InventoryStatus): Observable<InventoryStatus>{
    return this.http.post<any>(`${ApiPath.RETURN_OUTPUT_ADD_INVENTORYSTATUS}`,inventoryStatus);
  }

  public updateInventoryStatus(inventoryStatus: InventoryStatus): Observable<InventoryStatus>{
    return this.http.put<any>(`${ApiPath.RETURN_OUTPUT_UPDATE_INVENTORYSTATUS}`, inventoryStatus);
  }

  public deleteInventoryStatus(inventoryStatusId: number): Observable<void>{
    return this.http.delete<void>(`${ApiPath.RETURN_OUTPUT_DELETE_INVENTORYSTATUS}/${inventoryStatusId}`);
  }

  public getOnlyListInventoryStatus():Observable<InventoryStatus[]>{
    return this.http.get<InventoryStatus[]>(`${ApiPath.RETURN_OUTPUT_ONLYLIST_INVENTORYSTATUS}`)
  }


}

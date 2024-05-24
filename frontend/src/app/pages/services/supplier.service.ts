import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SupplierPageModel } from '../models/supplier-page';
import { ApiPath } from '@core/config';
import { Supplier } from '../models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

constructor(private http: HttpClient) { }

  public getAllSupplier(page: number): Observable<SupplierPageModel>{
    return this.http.get<SupplierPageModel>(`${ApiPath.RETURN_OUTPUT_LIST_SUPPLIER}?page=${page}`)
  }

  public findSearchAndPage(supplier: string, pageNumber: number): Observable<SupplierPageModel>{
    return this.http.get<SupplierPageModel>(`${ApiPath.RETURN_OUTPUT_SHOW_PAGE_SEARCH_SUPPLIER}?any=${supplier}&page=${pageNumber}`);
  }

  public addSupplier(supplier: Supplier): Observable<Supplier>{
    return this.http.post<any>(`${ApiPath.RETURN_OUTPUT_ADD_SUPPLIER}`,supplier);
  }

  public updateSupplier(supplier: Supplier): Observable<Supplier>{
    return this.http.put<any>(`${ApiPath.RETURN_OUTPUT_UPDATE_SUPPLIER}`, supplier);
  }

  public deleteSupplier(supplierId: number): Observable<void>{
    return this.http.delete<void>(`${ApiPath.RETURN_OUTPUT_DELETE_SUPPLIER}/${supplierId}`);
  }

  public findNameByCode(code : string): Observable<Supplier>{
    return this.http.get<Supplier>(`${ApiPath.RETURN_OUTPUT_FINDNAMEBYCODE_SUPPLIER}/${code}`);
  }
}

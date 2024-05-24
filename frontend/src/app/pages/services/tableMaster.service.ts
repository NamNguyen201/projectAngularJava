import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { TableMasterPageModel } from '../models/tableMaster-page';
import { ApiPath } from '@core/config';
import { SaveDoubleForm, TableMasterDto } from '../models/tableMasterDto';
import { TableMaster } from '../models/tableMaster';
import { TableMasterCheck6 } from '../models/tableMasterCheck6';
import { LoadingSpinnerDialogService } from '@layout/services';

@Injectable()
export class TableMasterService {

  constructor(private http: HttpClient,
              public loading: LoadingSpinnerDialogService,
              ) { 
                
              }       
  public getAllTableMaster(page: number): Observable<TableMasterPageModel>{
    this.loading.showSpinner(true);
    return this.http.get<TableMasterPageModel>(`${ApiPath.RETURN_OUTPUT_LIST_TABLE_MASTER}?page=${page}`).pipe(
      finalize(()=>{
        this.loading.showSpinner(false);
      })
    )
  }

  public addTableMasterDto(tableMasterDto: TableMasterDto): Observable<TableMasterDto>{
    return this.http.post<any>(`${ApiPath.RETURN_OUTPUT_ADD_TABLE_MASTER}`,tableMasterDto);
  }

  public findIdTableMaster(idTableMaster: number):Observable<TableMaster>{
    return this.http.get<TableMaster>(`${ApiPath.RETURN_OUTPUT_FIND_ID_TABLE_MASTER}/${idTableMaster}`);
  }

  public updateTableMaster(id : number, tableMasterDto: TableMasterDto): Observable<TableMaster>{
    return this.http.put<any>(`${ApiPath.RETURN_OUTPUT_UPDATE_TABLE_MASTER}/${id}`, tableMasterDto);
  }

  public findByCheckDto(tableMasterCheck : TableMasterCheck6):Observable<TableMaster>{
    return this.http.post<TableMaster>(`${ApiPath.RETURN_OUTPUT_FIND_BY_CHECK_DTO}`,tableMasterCheck);
  }

  public updateOrCreate(saveDoubleForm : SaveDoubleForm): Observable<TableMaster>{
    return this.http.put<TableMaster>(`${ApiPath.RETURN_OUTPUT_UPDATE_OR_CREATE_TABLE_MASTER}`,saveDoubleForm);
  }

  public findProductOwnerSupplierTableMaster(stringSearchTableMaster:string, pageNumber: number): Observable<TableMasterPageModel>{
    return this.http.get<TableMasterPageModel>(`${ApiPath.RETURN_OUTPUT_SEARCH_PAGE_TABLE_MASTER}?any=${stringSearchTableMaster}&page=${pageNumber}`);
  }
}

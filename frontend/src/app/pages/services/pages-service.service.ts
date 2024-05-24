import { EmployeePageModel } from './../models/employee-page';
import { Sort } from '@angular/material/sort';
import { ApiPath } from '@core/config';
import { environment } from '@env/environment';
import { Observable, finalize } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { set } from 'lodash';
import { BaseResponseModel } from '../models/base-response.model';
import { LoadingSpinnerDialogService } from '@layout/services';

@Injectable({
  providedIn: 'root'
})
export class PagesServiceService {


  constructor(private http: HttpClient,
              public loading: LoadingSpinnerDialogService) { 
              }

  public getAllEmployees(page: number): Observable<EmployeePageModel>{
    this.loading.showSpinner(true);
    return this.http.get<EmployeePageModel>(`${ApiPath.RETURN_OUTPUT_LIST_TABLE}?page=${page}`).pipe(
      finalize(()=>{
        this.loading.showSpinner(false);
      })
    );
  }
  public addEmployees(employee: Employee): Observable<Employee>{
    return this.http.post<any>(`${ApiPath.RETURN_OUTPUT_ADD_TABLE}`,employee);
  }

  public updateEmployees(employee: Employee): Observable<Employee>{
    return this.http.put<any>(`${ApiPath.RETURN_OUTPUT_UPDATE_TABLE}`, employee);
  }

  public deleteEmployees(employeeId: number): Observable<void>{
    return this.http.delete<void>(`${ApiPath.RETURN_OUTPUT_DELETE_TABLE}/${employeeId}`);
  }

  public findSearchAndPage(employee: string, pageNumber: number): Observable<EmployeePageModel>{
    return this.http.get<EmployeePageModel>(`${ApiPath.RETURN_OUTPUT_SHOW_PAGE_SEARCH_TABLE}?any=${employee}&page=${pageNumber}`);
  }
}

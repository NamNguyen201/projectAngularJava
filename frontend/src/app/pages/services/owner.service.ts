import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OwnerPageModel } from '../models/owner-page';
import { Observable } from 'rxjs';
import { ApiPath } from '@core/config';
import { Owner } from '../models/owner';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http: HttpClient) { }
  
  public getAllOwner(page: number): Observable<OwnerPageModel>{
    return this.http.get<OwnerPageModel>(`${ApiPath.RETURN_OUTPUT_LIST_OWNER}?page=${page}`)
  }

  public findSearchAndPage(owner: string, pageNumber: number): Observable<OwnerPageModel>{
    return this.http.get<OwnerPageModel>(`${ApiPath.RETURN_OUTPUT_SHOW_PAGE_SEARCH_OWNER}?any=${owner}&page=${pageNumber}`);
  }

  public addOwner(owner: Owner): Observable<Owner>{
    return this.http.post<any>(`${ApiPath.RETURN_OUTPUT_ADD_OWNER}`,owner);
  }

  public updateOwner(owner: Owner): Observable<Owner>{
    return this.http.put<any>(`${ApiPath.RETURN_OUTPUT_UPDATE_OWNER}`, owner);
  }

  public deleteOwner(ownerId: number): Observable<void>{
    return this.http.delete<void>(`${ApiPath.RETURN_OUTPUT_DELETE_OWNER}/${ownerId}`);
  }

  public findNameByCode(code: string): Observable<Owner>{
    return this.http.get<Owner>(`${ApiPath.RETURN_OUTPUT_FINDNAMEBYCODE_OWNER}/${code}`);
  }
}

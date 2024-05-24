import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationPageModel } from '../models/location-page';
import { ApiPath } from '@core/config';
import { Locations } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

constructor(private http: HttpClient) { }
  public getAlllocation(page: number): Observable<LocationPageModel>{
    return this.http.get<LocationPageModel>(`${ApiPath.RETURN_OUTPUT_LIST_LOCATION}?page=${page}`)
  }

  public findSearchAndPage(location: string, pageNumber: number): Observable<LocationPageModel>{
    return this.http.get<LocationPageModel>(`${ApiPath.RETURN_OUTPUT_SHOW_PAGE_SEARCH_LOCATION}?any=${location}&page=${pageNumber}`);
  }

  public addLocation(location: Locations): Observable<Locations>{
    return this.http.post<any>(`${ApiPath.RETURN_OUTPUT_ADD_LOCATION}`,location);
  }

  public updateLocation(location: Locations): Observable<Locations>{
    return this.http.put<any>(`${ApiPath.RETURN_OUTPUT_UPDATE_LOCATION}`, location);
  }

  public deleteLocation(locationId: number): Observable<void>{
    return this.http.delete<void>(`${ApiPath.RETURN_OUTPUT_DELETE_LOCATION}/${locationId}`);
  }

  public findIdWareHouse(warehouseId: number):Observable<Locations[]>{
    return this.http.get<Locations[]>(`${ApiPath.RETURN_OUTPUT_FIND_ID_WAREHOUSE_LOCATION}?warehouseId=${warehouseId}`);
  }
}
